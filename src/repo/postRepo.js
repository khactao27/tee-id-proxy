module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Post } = schemas
  const addPost = (data) => {
    const n = new Post(data)
    return n.save()
  }
  const getPostById = (id) => {
    return Post.findById(id)
  }
  const deletePost = (id) => {
    return Post.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updatePost = (id, n) => {
    return Post.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Post.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Post.countDocuments(pipe)
  }
  const getPostAgg = (pipe) => {
    return Post.aggregate(pipe)
  }
  const getPost = (pipe, limit, skip, sort) => {
    return Post.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getPostNoPaging = (pipe) => {
    return Post.find(pipe)
  }
  const removePost = (pipe) => {
    return Post.deleteMany(pipe)
  }
  return {
    getPostNoPaging,
    removePost,
    addPost,
    getPostAgg,
    getPostById,
    deletePost,
    updatePost,
    checkIdExist,
    getCount,
    getPost
  }
}
