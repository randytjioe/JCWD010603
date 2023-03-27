import { Stack, Button, Text } from "@chakra-ui/react";

function Pagination(props) {
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);

  const handleClick = (pageNumber) => {
    props.onChange(pageNumber);
  };

  const getPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <Stack direction="row" spacing={2} mt={4}>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            variant={props.currentPage === number ? "solid" : "ghost"}
            colorScheme="blue"
            size="sm"
            onClick={() => handleClick(number)}
          >
            {number}
          </Button>
        ))}
      </Stack>
    );
  };

  const indexOfLastItem = props.currentPage * props.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - props.itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {currentItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Text>{`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${
          props.totalItems
        } items`}</Text>
        {getPagination()}
      </Stack>
    </div>
  );
}

export default Pagination;
