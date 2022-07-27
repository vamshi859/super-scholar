import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZ2NTE3ODE2QGdtYWlsLmNvbSIsImlkIjoiNjJlMTI1NmUxMzRlYTdkNTMzMTUxYzU4IiwiaWF0IjoxNjU4OTIyMzUwLCJleHAiOjE2NTk1MjcxNTB9.8hsBxg4DDaMb81uycRo1QpZNi206IbNZ6gbAbjp1sUQ"
        
        let decodeData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decodeData?.id 

        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;