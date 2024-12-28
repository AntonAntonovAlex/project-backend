const { Like } = require('../models');
const jwt = require('jsonwebtoken');

exports.getLikesForTemplate = async (req, res) => {
    const { templateId } = req.params;

    try {
      const likesCount = await Like.count({ where: { templateId } });
      let userLiked = false;
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const like = await Like.findOne({
            where: {
              templateId,
              userId: decoded.id,
            },
          });
          userLiked = !!like;
        } catch (err) {
          console.error("Invalid token:", err.message);
        }
      }
      
      res.status(200).json({ likesCount, userLiked });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch likes data.' });
    }
};

exports.toggleLike = async (req, res) => {
    const { templateId } = req.body;
    const userId = req.user.id;
  
    try {
      const existingLike = await Like.findOne({ where: { templateId, userId } });
  
      if (existingLike) {
        await existingLike.destroy();
        return res.json({ message: 'Like removed' });
      }
  
      await Like.create({ templateId, userId });
      res.json({ message: 'Like added' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to toggle like' });
    }
};
  