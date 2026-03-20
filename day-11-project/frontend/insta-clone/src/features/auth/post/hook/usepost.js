import { createPost, getfeed, likePost, unlikePost } from "../service/post.api"
import { useContext } from "react"
import { PostContext } from "../post.context"

export const usePost = () => {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("usePost must be used inside PostContextProvider")
  }

  const { loading, setLoading, feed, setFeed } = context

  const handlegetfeed = async () => {
    try {
      setLoading(true)
      const data = await getfeed()
      setFeed(data.posts)
      return data
    } catch (error) {
      console.error("Feed fetch error:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (imageFile, caption) => {
    try {
      setLoading(true)
      const data = await createPost(imageFile, caption)
      setFeed((currentFeed) => [data.post, ...(currentFeed ?? [])])
      return data
    } catch (error) {
      console.error("Create post error:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleToggleLike = async (postId, isLiked) => {
    try {
      const data = isLiked ? await unlikePost(postId) : await likePost(postId)

      setFeed((currentFeed) =>
        (currentFeed ?? []).map((post) =>
          post._id === postId ? { ...post, isLiked: !isLiked } : post
        )
      )

      return data
    } catch (error) {
      console.error("Toggle like error:", error)
      return null
    }
  }

  return { loading, feed, handlegetfeed, handleCreatePost, handleToggleLike }
}
