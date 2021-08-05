import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

interface EditDeletePostButtonsProps {
  id: number
  creatorId: number
}

const EditDeletePostButtons: FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data }] = useMeQuery()
  const [, deletePost] = useDeletePostMutation()
  if (data?.me?.id !== creatorId) {
    return null
  }
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          mr={4}
          aria-label="Edit Post"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label="Delete Post"
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({ id })
        }}
      />
    </Box>
  )
}

export default EditDeletePostButtons
