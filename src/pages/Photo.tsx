import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { PhotoType, useGetPhotosQuery } from 'src/store/services/photos';

const Container = styled.section`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 0;
`;

const PhotoTitle = styled.p`
    font-size: 14px;
    color: #555;
    margin-left: 4px;
`;

const Photo = () => {

    const { data: photoData, isLoading } = useGetPhotosQuery({});
    
    const photos = useMemo(() => photoData?.slice(0, 100), [photoData]);
    // console.log(photos);

    return (
        <Container>
            {
                isLoading === true
                ? <div>Loading...</div>
                : <ImageList variant="woven" cols={3} gap={8}>
                    { photos?.map((item: PhotoType) => (
                        <ImageListItem key={item.id}>
                            <img src={item.url} alt={item.title} />
                            <PhotoTitle>{item.title}</PhotoTitle>
                        </ImageListItem>
                    )) }
                </ImageList>
            }
        </Container>
    );
}

export default Photo;