import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';

interface Props {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  take: number;
  skip: number;
  baseUrl: string;
}

export const RotatingPagination = ({ currentPage, totalPages, hasNextPage, take, skip, baseUrl }: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={skip > take ? `/${baseUrl}?skip=${skip - take}` : `/${baseUrl}`} />
        </PaginationItem>

        {currentPage > 2 && totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPages < 4 ? (
          <>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href={`/${baseUrl}?skip=${i * take}`} isActive={i * take === skip}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
        ) : (
          <>
            {
              // Always show the selected page at the middle unless it's the first or last page (max 3 pages shown)
              currentPage === 1 ? (
                <>
                  <PaginationItem>
                    <PaginationLink href={`/${baseUrl}`} isActive={skip === 0}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/${baseUrl}?skip=${take}`} isActive={skip === take}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/${baseUrl}?skip=${take * 2}`} isActive={skip === take * 2}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                </>
              ) : currentPage === totalPages ? (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href={`/${baseUrl}?skip=${take * (totalPages - 3)}`}
                      isActive={skip === take * (totalPages - 3)}
                    >
                      {totalPages - 2}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={`/${baseUrl}?skip=${take * (totalPages - 2)}`}
                      isActive={skip === take * (totalPages - 2)}
                    >
                      {totalPages - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href={`/${baseUrl}?skip=${take * (totalPages - 1)}`}
                      isActive={skip === take * (totalPages - 1)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              ) : (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href={skip > take ? `/${baseUrl}?skip=${skip - take}` : `/${baseUrl}`}
                      isActive={skip - take === skip}
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/${baseUrl}?skip=${skip}`} isActive={skip === skip}>
                      {currentPage}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/${baseUrl}?skip=${skip + take}`} isActive={skip + take === skip}>
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )
            }
          </>
        )}

        {((currentPage === 1 && totalPages > 3) || (currentPage > 1 && currentPage < totalPages - 1)) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext href={hasNextPage ? `/${baseUrl}?skip=${skip + take}` : `/${baseUrl}?skip=${skip}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
