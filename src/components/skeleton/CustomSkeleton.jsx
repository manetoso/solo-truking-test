import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
// lODING SKELETON COMPONENT
export const CustomSkeleton = () => {
  const skeletonsN = [1, 2, 3, 4, 5];
  return (
    <>
      {skeletonsN.map(i => (
        <Flex
          key={i}
          gap="1rem"
          border="2px"
          borderColor="transparent"
          p="1rem"
        >
          <SkeletonCircle boxSize="1.2rem" />
          <Flex flexDir="column" w="95%">
            <Skeleton height="1.2rem" spacing="4" />
            <SkeletonText mt="4" noOfLines={4} spacing="2" />
          </Flex>
        </Flex>
      ))}
    </>
  );
};
