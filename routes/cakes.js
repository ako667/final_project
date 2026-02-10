const express = require('express');
const router = express.Router();
const Cake = require('../models/Cake');
const jwt = require('jsonwebtoken');

// Middleware для проверки admin
function adminOnly(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Нет токена' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Доступ только для админа' });
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
}

// Получить все торты
router.get('/', async (req, res) => {
  const cakes = await Cake.find();
  res.json(cakes);
});

// Добавить торт (только админ)
router.post('/', adminOnly, async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    if (!name || !price || !description || !image) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }
    const cake = await Cake.create({ name, price, description, image });
    res.status(201).json(cake);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Удалить торт (только админ)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    await Cake.findByIdAndDelete(req.params.id);
    res.json({ message: 'Торт удалён' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
