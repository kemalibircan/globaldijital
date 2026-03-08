const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(__dirname, 'assets');

function loadTsExports(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText;
  const module = { exports: {} };
  const func = new Function('exports', 'require', 'module', '__filename', '__dirname', output);
  func(module.exports, require, module, filePath, path.dirname(filePath));
  return module.exports;
}

const packagesModule = loadTsExports(path.join(root, 'frontend/lib/packagesData.ts'));
const contactModule = loadTsExports(path.join(root, 'frontend/lib/contactInfo.ts'));

const packagesData = packagesModule.packagesData;
const contactInfo = contactModule.contactInfo;

const images = [
  { key: 'Im1', file: path.join(assetsDir, 'web-hero.jpg') },
  { key: 'Im2', file: path.join(assetsDir, 'web-portfolio.jpg') },
  { key: 'Im3', file: path.join(assetsDir, 'mobile-llm.jpg') },
  { key: 'Im4', file: path.join(assetsDir, 'mobile-chat.jpg') },
  { key: 'Im5', file: path.join(assetsDir, 'chat-ui.jpg') },
  { key: 'Im6', file: path.join(assetsDir, 'ai-mobile.jpg') },
  { key: 'Im7', file: path.join(assetsDir, 'web', 'unsplash-team.jpg') },
  { key: 'Im8', file: path.join(assetsDir, 'web', 'unsplash-meeting.jpg') },
];

function readJpegSize(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker === 0xc0 || marker === 0xc2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += 2 + length;
  }
  throw new Error('JPEG size not found');
}

const imageData = images.map((img) => {
  const buffer = fs.readFileSync(img.file);
  const size = readJpegSize(buffer);
  return { ...img, buffer, ...size };
});

const A4 = { width: 595.28, height: 841.89 };

const TURKISH_MAP = {
  'Ğ': 0xd0,
  'İ': 0xdd,
  'Ş': 0xde,
  'ğ': 0xf0,
  'ı': 0xfd,
  'ş': 0xfe,
  '•': 0x95,
  '–': 0x2d,
  '—': 0x2d,
  '’': 0x27,
  '“': 0x22,
  '”': 0x22,
};

function sanitizeText(text) {
  return String(text)
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[’]/g, "'")
    .replace(/…/g, '...');
}

function encodeLatin5(text) {
  const clean = sanitizeText(text);
  const bytes = [];
  for (const ch of clean) {
    if (TURKISH_MAP[ch] !== undefined) {
      bytes.push(TURKISH_MAP[ch]);
      continue;
    }
    const code = ch.charCodeAt(0);
    if (code <= 255) {
      bytes.push(code);
    } else {
      bytes.push(63); // '?'
    }
  }
  return Buffer.from(bytes);
}

function textLine(text, x, y, size, color = [0, 0, 0], font = 'F1') {
  const [r, g, b] = color;
  const encoded = encodeLatin5(text).toString('hex');
  return `${r} ${g} ${b} rg\nBT\n/${font} ${size} Tf\n1 0 0 1 ${x} ${y} Tm\n<${encoded}> Tj\nET\n`;
}

function rect(x, y, w, h, fill, stroke) {
  const parts = [];
  if (fill) parts.push(`${fill[0]} ${fill[1]} ${fill[2]} rg`);
  if (stroke) parts.push(`${stroke[0]} ${stroke[1]} ${stroke[2]} RG`);
  parts.push(`${x} ${y} ${w} ${h} re`);
  if (fill && stroke) parts.push('B');
  else if (fill) parts.push('f');
  else parts.push('S');
  return parts.join('\n') + '\n';
}

function imageDo(key, x, y, w, h) {
  return `q\n${w} 0 0 ${h} ${x} ${y} cm\n/${key} Do\nQ\n`;
}

function wrapText(text, maxWidth, fontSize) {
  const words = sanitizeText(text).split(' ');
  const maxChars = Math.max(8, Math.floor(maxWidth / (fontSize * 0.55)));
  const lines = [];
  let current = '';
  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function bulletList(lines, x, y, maxWidth, fontSize, lineHeight, color = [0.25, 0.25, 0.25]) {
  let content = '';
  let cursor = y;
  lines.forEach((line) => {
    const wrapped = wrapText(line, maxWidth, fontSize);
    wrapped.forEach((segment, idx) => {
      const prefix = idx === 0 ? '• ' : '  ';
      content += textLine(`${prefix}${segment}`, x, cursor, fontSize, color, 'F1');
      cursor -= lineHeight;
    });
  });
  return { content, cursor };
}

function footer(pageNumber) {
  let content = '';
  content += rect(48, 36, A4.width - 96, 0.5, [0.8, 0.82, 0.86], null);
  content += textLine('Global Dijital', 48, 22, 8, [0.45, 0.48, 0.52]);
  content += textLine(`Sayfa ${pageNumber}`, A4.width - 90, 22, 8, [0.45, 0.48, 0.52]);
  return content;
}

function pickPackage(id) {
  return packagesData.find((p) => p.id === id);
}

function buildPage1() {
  let content = '';
  content += rect(0, 700, A4.width, 141.89, [0.94, 0.97, 0.99], null);
  content += textLine('Global Dijital Satış Dosyası', 48, 802, 26, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Web, SEO, Mobil ve Yapay Zeka çözümleri', 48, 776, 12, [0.25, 0.3, 0.36]);
  content += textLine('2026 Paket Listesi', 48, 756, 10, [0.45, 0.48, 0.52]);

  content += imageDo('Im7', 330, 430, 220, 230);
  content += rect(48, 500, 260, 160, [0.98, 0.99, 1], [0.86, 0.88, 0.92]);
  content += textLine('Dijital büyüme için net yol haritası', 60, 640, 12, [0.08, 0.12, 0.18], 'F2');
  const introLines = [
    'Şeffaf fiyatlandırma ve hızlı teslim modeli',
    'Dönüşüm odaklı tasarım + SEO büyümesi',
    'Mobil uygulama ve chatbot entegrasyonları',
  ];
  const intro = bulletList(introLines, 62, 618, 230, 10, 14);
  content += intro.content;

  content += rect(48, 350, 499, 120, [0.97, 0.98, 0.99], [0.86, 0.88, 0.92]);
  content += textLine('Öne Çıkan Paketler', 60, 448, 12, [0.08, 0.12, 0.18], 'F2');
  const highlight = [pickPackage('silver'), pickPackage('gold'), pickPackage('diamond')];
  let x = 60;
  highlight.forEach((pkg) => {
    content += rect(x, 372, 145, 58, [1, 1, 1], [0.86, 0.88, 0.92]);
    content += textLine(`${pkg.emoji} ${pkg.name}`, x + 8, 418, 10, [0.1, 0.15, 0.2], 'F2');
    content += textLine(pkg.price, x + 8, 402, 9, [0.2, 0.35, 0.45]);
    content += textLine(pkg.tagline, x + 8, 386, 8, [0.3, 0.3, 0.32]);
    x += 160;
  });

  content += imageDo('Im1', 48, 120, 240, 180);
  content += rect(300, 120, 247, 180, [0.98, 0.99, 1], [0.86, 0.88, 0.92]);
  content += textLine('Hızlı Başlangıç', 312, 270, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine('7-21 gün içinde yayına hazır', 312, 250, 10, [0.25, 0.25, 0.25]);
  content += textLine('kurumsal web ve SEO altyapısı.', 312, 234, 10, [0.25, 0.25, 0.25]);
  content += textLine('İhtiyaca göre mobil ve AI', 312, 214, 10, [0.25, 0.25, 0.25]);
  content += textLine('ekipleri devreye alıyoruz.', 312, 198, 10, [0.25, 0.25, 0.25]);

  content += footer(1);
  return content;
}

function buildPackageCard(pkg, x, y, w, h) {
  let content = '';
  content += rect(x, y, w, h, [0.985, 0.985, 0.995], [0.86, 0.88, 0.92]);
  content += textLine(`${pkg.emoji} ${pkg.name}`, x + 12, y + h - 26, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine(`${pkg.price} / ${pkg.period}`, x + 12, y + h - 44, 9, [0.2, 0.35, 0.45]);
  content += textLine(pkg.tagline, x + 12, y + h - 60, 9, [0.25, 0.25, 0.28]);
  const lines = pkg.features.slice(0, 3);
  const bullet = bulletList(lines, x + 12, y + h - 80, w - 24, 8.5, 12, [0.25, 0.25, 0.25]);
  content += bullet.content;
  if (pkg.popular) {
    content += rect(x + w - 78, y + h - 28, 66, 16, [0.16, 0.62, 0.36], null);
    content += textLine('Popüler', x + w - 70, y + h - 24, 8, [1, 1, 1]);
  }
  return content;
}

function buildPage2() {
  let content = '';
  content += textLine('Web Paketleri', 48, 792, 22, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Bronze, Silver, Gold, Platinum ile kademeli büyüme', 48, 768, 11, [0.35, 0.4, 0.45]);

  const cardW = 244;
  const cardH = 170;
  const startX = 48;
  const gapX = 12;
  const row1Y = 560;
  const row2Y = 370;
  content += buildPackageCard(pickPackage('bronze'), startX, row1Y, cardW, cardH);
  content += buildPackageCard(pickPackage('silver'), startX + cardW + gapX, row1Y, cardW, cardH);
  content += buildPackageCard(pickPackage('gold'), startX, row2Y, cardW, cardH);
  content += buildPackageCard(pickPackage('platinum'), startX + cardW + gapX, row2Y, cardW, cardH);

  content += imageDo('Im2', 48, 120, 230, 170);
  content += rect(290, 120, 257, 170, [0.97, 0.98, 0.99], [0.86, 0.88, 0.92]);
  content += textLine('Neden Bu Paketler?', 302, 262, 12, [0.08, 0.12, 0.18], 'F2');
  const reasons = [
    'Marka güveni ve kurumsal görünüm',
    'SEO ile sürdürülebilir müşteri akışı',
    'Mobil uyum + hızlı açılış',
  ];
  const reasonList = bulletList(reasons, 302, 242, 230, 9, 13);
  content += reasonList.content;

  content += footer(2);
  return content;
}

function buildPackageListBlock(pkg, x, y) {
  let content = '';
  content += textLine(`${pkg.emoji} ${pkg.name}`, x, y, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine(`${pkg.price} / ${pkg.period}`, x, y - 16, 9, [0.2, 0.35, 0.45]);
  content += textLine(pkg.tagline, x, y - 32, 9, [0.25, 0.25, 0.28]);
  const lines = pkg.features.slice(0, 4);
  const bullet = bulletList(lines, x, y - 50, 260, 8.5, 12);
  content += bullet.content;
  return { content, nextY: bullet.cursor - 10 };
}

function buildPage3() {
  let content = '';
  content += textLine('Gelişmiş & Mobil Paketler', 48, 792, 22, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Şubeli işletmeler, mobil uygulama ve AI odaklı çözümler', 48, 768, 11, [0.35, 0.4, 0.45]);

  const diamond = pickPackage('diamond');
  const diamondMobil = pickPackage('diamondMobil');
  const elite = pickPackage('elite');

  let y = 710;
  let block = buildPackageListBlock(diamond, 48, y);
  content += block.content;
  y = block.nextY;
  block = buildPackageListBlock(diamondMobil, 48, y);
  content += block.content;
  y = block.nextY;
  block = buildPackageListBlock(elite, 48, y);
  content += block.content;

  content += imageDo('Im6', 340, 520, 200, 230);
  content += imageDo('Im5', 340, 270, 200, 230);

  content += rect(340, 120, 200, 130, [0.97, 0.98, 0.99], [0.86, 0.88, 0.92]);
  content += textLine('Ek Hizmetler', 352, 230, 12, [0.08, 0.12, 0.18], 'F2');
  const extra = packagesModule.ekHizmetler || [];
  let ly = 212;
  extra.slice(0, 5).forEach((item) => {
    const label = item.price ? `${item.label} (${item.price})` : item.label;
    content += textLine(`• ${label}`, 352, ly, 8.5, [0.25, 0.25, 0.25]);
    ly -= 12;
  });

  content += footer(3);
  return content;
}

function buildPage4() {
  let content = '';
  content += textLine('Akıllı Entegrasyonlar', 48, 792, 22, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Chatbot, ChatGPT mobil ve otomasyon çözümleri', 48, 768, 11, [0.35, 0.4, 0.45]);

  content += rect(48, 610, 500, 120, [0.98, 0.99, 1], [0.86, 0.88, 0.92]);
  content += textLine('Chatbot Entegrasyonları', 62, 708, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Web sitesi ve WhatsApp kanallarında 7/24 otomatik destek,', 62, 688, 10, [0.25, 0.25, 0.25]);
  content += textLine('sık sorulan sorular, hızlı yönlendirme ve lead toplama.', 62, 672, 10, [0.25, 0.25, 0.25]);

  content += rect(48, 470, 500, 120, [0.97, 0.98, 0.99], [0.86, 0.88, 0.92]);
  content += textLine('ChatGPT Mobil Entegrasyonları', 62, 568, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Mobil uygulamanıza AI asistan, akıllı öneri ve kişiselleştirme', 62, 548, 10, [0.25, 0.25, 0.25]);
  content += textLine('kurguları ekliyoruz. Kampanya, sadakat ve destek otomasyonu.', 62, 532, 10, [0.25, 0.25, 0.25]);

  content += rect(48, 330, 500, 120, [0.96, 0.97, 0.98], [0.86, 0.88, 0.92]);
  content += textLine('Otomasyon & API Entegrasyonları', 62, 428, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine('CRM, rezervasyon, ödeme ve sadakat sistemlerini tek akışta', 62, 408, 10, [0.25, 0.25, 0.25]);
  content += textLine('birleştiriyoruz. Ölçülebilir büyüme için raporlama ekliyoruz.', 62, 392, 10, [0.25, 0.25, 0.25]);

  content += imageDo('Im8', 360, 130, 180, 160);
  content += rect(48, 130, 300, 160, [0.98, 0.99, 1], [0.86, 0.88, 0.92]);
  content += textLine('Bir sonraki adım', 62, 260, 12, [0.08, 0.12, 0.18], 'F2');
  content += textLine('Size özel teklif ve yol haritası için', 62, 242, 10, [0.25, 0.25, 0.25]);
  content += textLine('30 dakikalık ücretsiz keşif görüşmesi planlayalım.', 62, 226, 10, [0.25, 0.25, 0.25]);
  content += textLine(`E-posta: ${contactInfo.email}`, 62, 198, 10, [0.2, 0.35, 0.45]);
  content += textLine(`Telefon: ${contactInfo.phone}`, 62, 182, 10, [0.2, 0.35, 0.45]);
  content += textLine(`Konum: ${contactInfo.address}`, 62, 166, 10, [0.2, 0.35, 0.45]);

  content += footer(4);
  return content;
}

function buildPdf() {
  const objects = [];
  const addObject = (body) => {
    objects.push(body);
    return objects.length; // 1-based
  };

  const encodingObj = addObject(
    '<< /Type /Encoding /BaseEncoding /WinAnsiEncoding /Differences [208 /Gbreve 221 /Idotaccent 222 /Scedilla 240 /gbreve 253 /dotlessi 254 /scedilla] >>'
  );
  const fontObj = addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding ${encodingObj} 0 R >>`);
  const fontBoldObj = addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding ${encodingObj} 0 R >>`);

  const imageObjs = {};
  imageData.forEach((img) => {
    const body = `<< /Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${img.buffer.length} >>\nstream\n`;
    const footer = '\nendstream';
    const objIndex = addObject(body + img.buffer.toString('binary') + footer);
    imageObjs[img.key] = objIndex;
  });

  const pages = [];
  const contents = [];

  const pageContents = [buildPage1(), buildPage2(), buildPage3(), buildPage4()];

  pageContents.forEach((content) => {
    const stream = `<< /Length ${Buffer.byteLength(content, 'binary')} >>\nstream\n${content}\nendstream`;
    const contentObj = addObject(stream);
    contents.push(contentObj);
  });

  pageContents.forEach((_, idx) => {
    const resources = [
      `/Font << /F1 ${fontObj} 0 R /F2 ${fontBoldObj} 0 R >>`,
      `/XObject << ${Object.entries(imageObjs)
        .map(([key, id]) => `/${key} ${id} 0 R`)
        .join(' ')} >>`,
    ].join(' ');

    const pageObj = addObject(`<< /Type /Page /Parent 0 0 R /MediaBox [0 0 ${A4.width} ${A4.height}] /Resources << ${resources} >> /Contents ${contents[idx]} 0 R >>`);
    pages.push(pageObj);
  });

  const pagesObj = addObject(`<< /Type /Pages /Kids [${pages.map((id) => `${id} 0 R`).join(' ')}] /Count ${pages.length} >>`);
  const catalogObj = addObject(`<< /Type /Catalog /Pages ${pagesObj} 0 R >>`);

  pages.forEach((pageId) => {
    objects[pageId - 1] = objects[pageId - 1].replace('/Parent 0 0 R', `/Parent ${pagesObj} 0 R`);
  });

  let pdf = '%PDF-1.4\n%\xFF\xFF\xFF\xFF\n';
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(pdf, 'binary'));
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, 'binary');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += `0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) {
    const offset = offsets[i].toString().padStart(10, '0');
    pdf += `${offset} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogObj} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return Buffer.from(pdf, 'binary');
}

const pdfBuffer = buildPdf();
const outPath = path.join(__dirname, 'global-dijital-satis-paketi.pdf');
fs.writeFileSync(outPath, pdfBuffer);

console.log('PDF oluşturuldu:', outPath);
