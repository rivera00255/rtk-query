import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import { useAddPostMutation } from 'src/store/services/posts';

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
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 360px;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    padding: 10px;
    margin-bottom: 20px;
`;

const PostFormModal = (props : { formPopup: boolean, setFormPopup: Dispatch<SetStateAction<boolean>>  }) => {

    const { formPopup, setFormPopup } = props;

    const modalRef: any = useRef(null);

    const [post, setPost] = useState('');

    const [addPost] = useAddPostMutation();

    const handlePost = async () => {
        try {
            if(post !== '') {
                const response: any = await addPost({ body: post });
                if (response.data.body !== '') {
                    alert(`No. ${response.data.id} Post ADD!`);
                    setPost('');
                    setFormPopup(false);
                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const clickOutside = (e: Event) => { // modal 외부영역 클릭 시 닫힘
            if(formPopup === true && !modalRef.current.contains(e.target)) {
                setFormPopup(false);
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
                    <Textarea onChange={(e) => setPost(e.target.value)}></Textarea>
                    <Button variant="contained" onClick={handlePost}>Add Post</Button>
                </Content>
            </Modal>
        </Container>
    );
}

export default PostFormModal;