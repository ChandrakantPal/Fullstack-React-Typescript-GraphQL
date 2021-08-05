import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'

interface UpdootSectionProps {
  post: PostSnippetFragment
}

const UpdootSection: FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading')
  const [, vote] = useVoteMutation()
  console.log({ post })

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return
          }
          setLoadingState('updoot-loading')
          await vote({
            postId: post.id,
            value: 1,
          })
          setLoadingState('not-loading')
        }}
        colorScheme={post.voteStatus === 1 ? 'green' : undefined}
        isLoading={loadingState === 'updoot-loading'}
        aria-label="up vote"
        fontSize="24"
        icon={<ChevronUpIcon />}
      />
      {post.points}
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return
          }
          setLoadingState('downdoot-loading')
          await vote({
            postId: post.id,
            value: -1,
          })
          setLoadingState('not-loading')
        }}
        colorScheme={post.voteStatus === -1 ? 'red' : undefined}
        isLoading={loadingState === 'downdoot-loading'}
        aria-label="down vote"
        fontSize="24"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  )
}

export default UpdootSection
