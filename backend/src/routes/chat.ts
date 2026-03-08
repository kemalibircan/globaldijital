import express from 'express';
import { body, validationResult } from 'express-validator';
import OpenAI from 'openai';
import { pool } from '../config/database';
import { GLOBALDIJITAL_SITE_PROMPT } from '../prompts/sitePrompt';

const router = express.Router();
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

/**
 * POST /api/chat
 * Body: { message: string }
 * OpenAI ile yanıt üretir, user + assistant mesajlarını chat_messages tablosuna yazar.
 */
router.post(
  '/',
  [
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { message } = req.body as { message: string };

      // Kullanıcı mesajını veritabanına kaydet
      await pool.query(
        'INSERT INTO chat_messages (role, content) VALUES ($1, $2)',
        ['user', message]
      );

      if (!openai) {
        const fallback =
          'OpenAI şu an yapılandırılmamış. Detaylı bilgi ve teklif için lütfen bize ulaşın: alikemal.bircan@globaldijital.com veya 0534 612 46 42.';
        await pool.query(
          'INSERT INTO chat_messages (role, content) VALUES ($1, $2)',
          ['assistant', fallback]
        );
        return res.json({ reply: fallback });
      }

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: GLOBALDIJITAL_SITE_PROMPT },
          { role: 'user', content: message },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      });

      const reply =
        completion.choices[0]?.message?.content?.trim() ||
        'Yanıt oluşturulamadı. Lütfen iletişime geçin: alikemal.bircan@globaldijital.com, 0534 612 46 42.';

      // Asistan yanıtını veritabanına kaydet
      await pool.query(
        'INSERT INTO chat_messages (role, content) VALUES ($1, $2)',
        ['assistant', reply]
      );

      res.json({ reply });
    } catch (error: unknown) {
      console.error('Chat API error:', error);
      const errMessage =
        error instanceof Error ? error.message : 'Beklenmeyen hata.';
      res.status(500).json({
        message: 'Chat servisi geçici olarak kullanılamıyor.',
        reply: `Üzgünüz, bir hata oluştu. Lütfen doğrudan bize yazın: alikemal.bircan@globaldijital.com veya 0534 612 46 42. (Hata: ${errMessage})`,
      });
    }
  }
);

export default router;
