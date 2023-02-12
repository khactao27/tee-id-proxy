module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')
    const {
        schemaValidator,
        schemas: {
            Post
        }
    } = container.resolve('models')
    const { httpCode, serverHelper } = container.resolve('config')
    const { postRepo } = container.resolve('repo')

    const addPost = async (req, res) => {
        try {
            const body = req.body
            const {
                error,
                value
            } = await schemaValidator(body, 'Post')
            if (error) {
                return res.status(httpCode.BAD_REQUEST).json({ msg: error.message })
            }
            const item = await postRepo.addPost(value)
            return res.status(httpCode.CREATED).json(item)
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR', ok: false })
        }
    }
    const deletePost = async (req, res) => {
        try {
            const { id } = req.params
            if (id && id.length === 24) {
                await postRepo.deletePost(id)
                return res.status(httpCode.SUCCESS).json({ ok: true })
            }
            return res.status(httpCode.BAD_REQUEST).json({ msg: 'BAD REQUEST', ok: false })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({ ok: false })
        }
    }
    const getPostById = async (req, res) => {
        try {
            const { id } = req.params
            if (id && id.length === 24) {
                const item = await postRepo.getPostById(id)
                return res.status(httpCode.SUCCESS).json(item)
            }
            return res.status(httpCode.BAD_REQUEST).json({ msg: 'BAD REQUEST', ok: false })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'UNKNOWN ERROR', ok: false })
        }
    }
    const updatePost = async (req, res) => {
        try {
            const { id } = req.params
            const body = req.body
            if (id && id.length === 24 && body) {
                const {
                    error,
                    value
                } = await schemaValidator(body, 'Post')
                if (error) {
                    return res.status(httpCode.BAD_REQUEST).json({ msg: error.message })
                }
                const item = await postRepo.updatePost(id, value)
                return res.status(httpCode.SUCCESS).json(item)
            }
            return res.status(httpCode.BAD_REQUEST).json()
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({ ok: false })
        }
    }
    const getPost = async (req, res) => {
        try {
            let {
                page,
                perPage,
                sort,
                ids
            } = req.query
            page = +page || 1
            perPage = +perPage || 20
            sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
            const skip = (page - 1) * perPage
            const search = { ...req.query }
            const pipe = {}

            if (ids) {
                if (ids.constructor === Array) {
                    pipe.id = { $in: ids }
                } else if (ids.constructor === String) {
                    pipe.id = { $in: ids.split(',') }
                }
            }
            delete search.ids
            delete search.page
            delete search.perPage
            delete search.sort

            Object.keys(search).forEach(i => {
                const value = search[i]
                const pathType = (Post.schema.path(i) || {}).instance || ''
                if (pathType.toLowerCase() === 'objectid') {
                    pipe[i] = value ? ObjectId(value) : { $exists: false }
                } else if (pathType === 'Number') {
                    pipe[i] = +value ? +value : 0
                } else if (pathType === 'String' && value.constructor === String) {
                    pipe[i] = new RegExp(value.replace(/\\/g, '\\\\'), 'gi')
                } else {
                    pipe[i] = value
                }
            })
            const data = await postRepo.getPost(pipe, perPage, skip, sort)
            const total = await postRepo.getCount(pipe)
            return res.status(httpCode.SUCCESS).json({
                perPage,
                skip,
                sort,
                data,
                total,
                page
            })
        } catch (e) {
            logger.e(e)
            res.status(httpCode.UNKNOWN_ERROR).json({ ok: false, msg: 'UNKNOWN ERROR' })
        }
    }
    return {
        addPost,
        getPost,
        getPostById,
        updatePost,
        deletePost
    }
}
