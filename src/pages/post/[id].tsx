import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import EditDeletePostButtons from '../../components/EditDeletePostButtons'
import Layout from '../../components/Layout'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useGetPostFormUrl } from '../../utils/useGetPostFromUrl'

const Post = () => {
  const [{ data, error, fetching }] = useGetPostFormUrl()

  if (fetching) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      <Box mb={4}>{data.post.text}</Box>
      <EditDeletePostButtons
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
