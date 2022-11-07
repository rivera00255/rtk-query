import React, { Dispatch, SetStateAction, useMemo, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { CommentType, useGetCommentsQuery } from 'src/store/services/comments';
import { PostType } from 'src/store/services/posts';
import { PostContentType } from 'src/pages/Main';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modal = styled.div`
    width: 520px;
    min-height: 520px;
    border-radius: 5px;
    background: #fefefe;
    padding: 20px;
`;

const Content = styled.div`
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    padding: 10px 16px;
`;

const CommentWrapper = styled.div`
    width: 100%;
    padding: 0 16px;
    font-size: 14px;
    color: #555;
`;

const Comment = styled.div`
    margin: 8px 0;
`;

const Name = styled.p`
    display: inline-block;
    border-bottom: 2px solid #ddd;
    color: #555;
    font-size: 14px;
    margin-right: 8px;
    font-weight: 600;
`;

const PostModal = (props : { popup: boolean, setPopup: Dispatch<SetStateAction<boolean>>, selected: PostContentType  }) => {

    const { popup, setPopup, selected } = props;

    const modalRef: any = useRef(null);

    const { data: commentData, isLoading } = useGetCommentsQuery({ postId: selected.postId });
    const comments = useMemo(() => commentData, [commentData]);
    // console.log(comments);

    useEffect(() => {
        const clickOutside = (e: Event) => { // modal 외부영역 클릭 시 닫힘
            if(popup === true && !modalRef.current.contains(e.target)) {
                // console.log('outside')
                setPopup(false);
            }
        }

        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    }, [])

    return (
        <Container>
            <Modal ref={modalRef}>
                <Content>
                    <Name>{selected.username}</Name>
                    <p><strong>{selected.title}</strong></p>
                    <p>{selected.body}</p>
                </Content>
                <CommentWrapper>
                    { isLoading && <Comment>Loading...</Comment> }
                    {
                        comments?.map((item: CommentType) => (
                            <Comment key={item.id}>
                                <Name>{item.email.split('@')[0]}</Name>
                                {item.body}
                            </Comment>
                        ))
                    }
                </CommentWrapper>
            </Modal>
        </Container>
    )
}

export default PostModal;