import { FC, useState, ChangeEvent, useRef, useEffect } from 'react'
import { Button, Row, Col, Input } from 'antd'
import { useAppContext } from 'hooks'
import { observer } from 'mobx-react-lite'
import { offlineRequest } from 'utils'

export const Dashboard: FC = observer(() => {
    const [text, setText] = useState('');
    const [list, setList] = useState<string[]>([]);
    const { api, store } = useAppContext()
    const handleLogout = () => {
        api.auth.logout(store.auth)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handlePressEnter = () => {
        setList([...list, text]);
        setText('');

        offlineRequest.put('/todos', { text });
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await offlineRequest.get('/todos/query');
            setList(res!.data.map((item: { text: string }) => item.text));
        }

        fetchTodos();
    }, []);

    return (
        <>
            <Row align='middle' justify='center' style={{ height: 300 }}>
                <Col>
                    <Button type='primary' onClick={handleLogout}>退出登录</Button>
                </Col>
            </Row>
            <Row align='middle' justify='center'>
                <Col>
                    <Input
                        value={text}
                        onChange={handleInputChange}
                        onPressEnter={handlePressEnter}
                    />
                </Col>
            </Row>
            {
                list.map((item, index) => {
                    return (
                        <Row key={index} align='middle' justify='center'>
                            <Col>{item}</Col>
                        </Row>
                    );
                })
            }
        </>
    )
})