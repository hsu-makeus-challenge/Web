import { useEffect } from 'react';
import useModalStore from '../store/modalStore';
import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div<{ backdropPath: string | null }>`
  background: ${props => props.backdropPath 
    ? `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), 
       url(https://image.tmdb.org/t/p/original${props.backdropPath}) center/cover no-repeat`
    : 'rgba(255, 255, 255, 0.95)'};
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  gap: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: ${props => props.backdropPath ? 'white' : 'inherit'};

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const PosterSection = styled.div`
  flex: 0 0 300px;
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const InfoSection = styled.div`
  flex: 1;
`;

const MovieTitle = styled.h2`
  margin-bottom: 1rem;
  color: inherit;
  font-size: 2rem;
  font-weight: bold;
`;

const MovieInfo = styled.div`
  margin-bottom: 1rem;
  color: inherit;
  opacity: 0.9;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: inherit;
  margin-right: 0.5rem;
`;

const Overview = styled.div`
  margin-top: 1.5rem;
  line-height: 1.6;
`;

const VoteBadge = styled.div`
  display: inline-block;
  background-color: #032541;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IMDBButton = styled(Button)`
  background-color: #f5c518;
  color: #000;
  border: none;

  &:hover {
    background-color: #e6b800;
  }
`;

const CloseModalButton = styled(Button)`
  background-color: transparent;
  color: inherit;
  border: 2px solid currentColor;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MovieModal = () => {
  const { isOpen, selectedMovie, closeModal } = useModalStore();

  const handleIMDBSearch = () => {
    if (selectedMovie) {
      const searchQuery = encodeURIComponent(selectedMovie.title);
      window.open(`https://www.imdb.com/find/?q=${searchQuery}`, '_blank');
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !selectedMovie) return null;

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent backdropPath={selectedMovie.backdrop_path} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <PosterSection>
          <MoviePoster
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />
        </PosterSection>
        <InfoSection>
          <MovieTitle>{selectedMovie.title}</MovieTitle>
          <VoteBadge>
            평점: {selectedMovie.vote_average.toFixed(1)} ({selectedMovie.vote_count}명 참여)
          </VoteBadge>
          <MovieInfo>
            <InfoLabel>원제목:</InfoLabel>
            {selectedMovie.original_title}
          </MovieInfo>
          <MovieInfo>
            <InfoLabel>개봉일:</InfoLabel>
            {selectedMovie.release_date}
          </MovieInfo>
          <MovieInfo>
            <InfoLabel>언어:</InfoLabel>
            {selectedMovie.original_language.toUpperCase()}
          </MovieInfo>
          <MovieInfo>
            <InfoLabel>인기도:</InfoLabel>
            {selectedMovie.popularity.toFixed(0)}
          </MovieInfo>
          <Overview>
            <InfoLabel>줄거리:</InfoLabel>
            <p>{selectedMovie.overview || '줄거리 정보가 없습니다.'}</p>
          </Overview>
          <ButtonContainer>
            <IMDBButton onClick={handleIMDBSearch}>
              IMDB에서 검색
            </IMDBButton>
            <CloseModalButton onClick={closeModal}>
              닫기
            </CloseModalButton>
          </ButtonContainer>
        </InfoSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieModal;