const Expense = require('../models/Expense');

// Create new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description, date, type } = req.body;

    const newExpense = new Expense({
      user: req.user.id,
      amount,
      category,
      description,
      date,
      type: type || 'expense', // fallback to 'expense'
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await expense.deleteOne(); 

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    console.error('❌ Delete Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
