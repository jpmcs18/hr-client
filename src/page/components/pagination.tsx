import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

export default function Pagination({
  pages,
  currentPageNumber,
  goInPage,
}: {
  pages: number;
  currentPageNumber: number;
  goInPage: (page: number) => void;
}) {
  const currentPage = useRef<number>(currentPageNumber);
  const pageList = useRef<number[]>([]);
  const [canGoFirst, setGoFirst] = useState<boolean>(false);
  const [canGoBefore, setGoBefore] = useState<boolean>(false);
  const [canGoAfter, setGoAfter] = useState<boolean>(false);
  const [canGoLast, setGoLast] = useState<boolean>(false);

  useEffect(() => {
    currentPage.current = currentPageNumber;
    let pl: number[] = [];
    for (let i = 1; i <= pages; i++) {
      pl.push(i);
    }
    pageList.current = pl;

    setGoAfter(false);
    setGoLast(false);
    setGoFirst(false);
    setGoBefore(false);

    if (pages > 1) {
      if (currentPageNumber !== pages) {
        setGoAfter(true);
        setGoLast(true);
      }
      if (currentPageNumber !== 1) {
        setGoFirst(true);
        setGoBefore(true);
      }
    }

    return () => {
      pl = [];
    };
  }, [pages, currentPageNumber]);

  function goToFirst() {
    if (!canGoFirst) return;

    goInPage(1);

    setGoFirst(false);
    setGoBefore(false);
    setGoAfter(true);
    setGoLast(true);
  }

  function goToBefore() {
    if (!canGoBefore) return;

    currentPage.current = currentPage.current - 1;
    if (currentPage.current === 1) {
      setGoFirst(false);
      setGoBefore(false);
    }

    goInPage(currentPage.current);

    setGoAfter(true);
    setGoLast(true);
  }

  function goToAfter() {
    if (!canGoAfter) return;

    currentPage.current = currentPage.current + 1;
    if (currentPage.current === pages) {
      setGoAfter(false);
      setGoLast(false);
    }

    goInPage(currentPage.current);

    setGoFirst(true);
    setGoBefore(true);
  }

  function goToLast() {
    if (!canGoLast) return;
    currentPage.current = pages;
    setGoAfter(false);
    setGoLast(false);

    setGoFirst(true);
    setGoBefore(true);

    goInPage(pages);
  }

  function goToPage(page: number) {
    currentPage.current = page;
    setGoFirst(true);
    setGoBefore(true);
    setGoAfter(true);
    setGoLast(true);

    if (page === 1) {
      setGoFirst(false);
      setGoBefore(false);
    }

    if (page === pages) {
      setGoAfter(false);
      setGoLast(false);
    }

    goInPage(page);
  }

  return (
    <div className='pagination btn-actions-group'>
      <button className='btn-action' disabled={!canGoFirst} onClick={goToFirst}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <button
        className='btn-action'
        disabled={!canGoBefore}
        onClick={goToBefore}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <div className='pages-container '>
        <button className='current-page'>{currentPage.current}</button>
        <div className='pages'>
          {pageList.current.map((pl) => (
            <div
              key={pl}
              className={pl === currentPage.current ? 'active' : ''}
              onClick={() => {
                goToPage(pl);
              }}>
              {pl}
            </div>
          ))}
        </div>
      </div>
      <button onClick={goToAfter} className='btn-action' disabled={!canGoAfter}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button onClick={goToLast} className='btn-action' disabled={!canGoLast}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
}
