import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import SimpleMdeReact from 'react-simplemde-editor';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Container } from '../components/Container';
import 'easymde/dist/easymde.min.css';
import './addPost.css';
import { useAppDispatch, useAppSelector } from '../redux/redux-hook';
import { isAuthSelector } from '../redux/slices/authSlice/selectors';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PostImg } from '../components/Post';
import { $authHost } from '../axios/axios';
import { BASE_URL } from '../utils/consts';
import Spinner from '../components/Spinner';
import { IPost } from '../types/Post';
import { fetchPosts } from '../redux/slices/postsSlice/postsSlice';

const AddPostContainer = styled(Container)`
    width: 800px;
`;

const AddPostWrapper = styled.div`
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.componentBg};
    border-radius: 10px;
    padding: 20px;
    min-width: 100%;
    position: relative;
    display: grid;
    row-gap: 20px;
`;

const TitleInput = styled.input`
    font-size: 32px;
    color: ${(props) => props.theme.colors.font};
    background-color: transparent;
    border: none;
    outline: none;
`;

const TagsInput = styled.input`
    font-size: 18px;
    color: ${(props) => props.theme.colors.font};
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #757575;
`;

const AddPostButtonWrapper = styled.div`
    display: flex;
    column-gap: 15px;
`;

const CancelButton = styled(Button)`
    color: #e23c2f;
    border: none;
`;

const AddPost = () => {
    const isAuth = useAppSelector(isAuthSelector);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const isEditing = Boolean(id);

    const onChange = useCallback((value: string) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const fields = {
                title,
                imageUrl,
                tags,
                text,
            };

            let res;

            if (isEditing) {
                res = await $authHost.patch(`/posts/${id}`, fields);
            } else {
                res = await $authHost.post('/posts', fields);
            }

            dispatch(fetchPosts({ page: 1 }));

            const _id = isEditing ? id : res.data._id;
            navigate(`/${_id}`);
        } catch (error) {
            console.warn(error);
        }
    };

    const onCancel = () => {
        navigate('/');
    };

    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.item(0);
            const formData = new FormData();
            formData.append('image', file as File);
            const { data } = await $authHost.post('/upload', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.warn(error);
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    useEffect(() => {
        if (isEditing) {
            $authHost.get<IPost>(`posts/${id}`).then((res) => {
                setTitle(res.data.title);
                setText(res.data.text);
                setImageUrl(res.data.imageUrl);
                setTags(res.data.tags.join(', '));
            });
        }
    }, []);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Введите текст ...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: 'demo',
            },
        }),
        []
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/login' />;
    }

    return (
        <AddPostContainer>
            <AddPostWrapper>
                <AddPostButtonWrapper>
                    <Button onClick={() => inputRef.current?.click()}>
                        Загрузить превью
                    </Button>
                    {imageUrl && (
                        <CancelButton onClick={onClickRemoveImage}>
                            Удалить
                        </CancelButton>
                    )}
                </AddPostButtonWrapper>
                <input
                    ref={inputRef}
                    type='file'
                    hidden
                    onChange={handleChangeFile}
                />
                {imageUrl && <PostImg src={`${BASE_URL}${imageUrl}`} />}
                <TitleInput
                    placeholder='Заголовок статьи...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TagsInput
                    placeholder='Tэги'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <SimpleMdeReact
                    onChange={onChange}
                    value={text}
                    options={options}
                />
                <AddPostButtonWrapper>
                    <Button onClick={onSubmit}>
                        {isEditing ? 'Редактировать' : 'Опубликовать'}
                    </Button>
                    <CancelButton onClick={onCancel}>Отмена</CancelButton>
                </AddPostButtonWrapper>
            </AddPostWrapper>
        </AddPostContainer>
    );
};

export default AddPost;
