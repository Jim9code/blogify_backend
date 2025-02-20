const pool = require('./db')  // Your database connection

// Like controller
const likeController = async (req, res) => {
  try {
    const { blogId } = req.params;
    
    // First update the likes
    await pool.promise().query(
      'UPDATE blogs SET likes = COALESCE(likes, 0) + 1 WHERE id = ?',
      [blogId]
    );

    // Then fetch the updated blog data
    const [rows] = await pool.promise().query(
      'SELECT likes FROM blogs WHERE id = ?',
      [blogId]
    );

    if (rows.length > 0) {
      res.status(200).json({ 
        message: 'Like added successfully',
        likes: rows[0].likes 
      });
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ error: 'Failed to add like' });
  }
};

// View controller
const viewController = async (req, res) => {
  try {
    const { blogId } = req.params;
    
    // First update the views
    await pool.promise().query(
      'UPDATE blogs SET views = COALESCE(views, 0) + 1 WHERE id = ?',
      [blogId]
    );

    // Then fetch the updated blog data
    const [rows] = await pool.promise().query(
      'SELECT views FROM blogs WHERE id = ?',
      [blogId]
    );

    if (rows.length > 0) {
      res.status(200).json({ 
        message: 'View counted successfully',
        views: rows[0].views 
      });
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error('View error:', error);
    res.status(500).json({ error: 'Failed to count view' });
  }
};

module.exports = {
  likeController,
  viewController
}; 