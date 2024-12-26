const { Comment, User } = require('../models');

exports.addComment = async (req, res) => {
  try {
    const { templateId, text } = req.body;
    const userId = req.user.id;

    if (!text || !templateId) {
      return res.status(400).json({ message: 'Text and templateId are required.' });
    }

    const comment = await Comment.create({ text, templateId, userId });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create comment.', error });
  }
};

exports.getCommentsByTemplateId = async (req, res) => {
  try {
    const { templateId } = req.params;

    const comments = await Comment.findAll({
      where: { templateId },
      include: [{ model: User, as: 'author', attributes: ['name', 'email'] }],
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch comments.', error });
  }
};
