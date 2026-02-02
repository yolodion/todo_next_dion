// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import axios from "axios";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderWrap = styled.div`
  width: 100vw;
  height: 100px;
  border-bottom: 0.5px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 70vw;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AddBox = styled.div`
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
`;

const Input = styled.input`
  width: 50vw;
  height: 70px;
  padding: 20px;
  border-radius: 40px;
  background-color: #f1f5f9;
  border: 1px solid #0f172a;
`;

const Button = styled.button`
  width: 15vw;
  height: 70px;
  background-color: #e2e8f0;
  border: 1px solid #0f172a;
  border-radius: 40px;
`;

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoItem = styled.div`
  width: 30vw;
  height: 50px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CheckBox = styled.div`
  width: 66vw;
  height: 50px;
  display: flex;
  margin-top: 40px;
  gap: 20px;
`;

const TodoBox = styled.div`
  width: 30vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bef264;
  border-radius: 40px;
  color: #15803d;
  font-weight: 600;
`;

const DoneBox = styled.div`
  width: 30vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #15803d;
  border-radius: 40px;
  color: #fcd34d;
  font-weight: 600;
`;

const TodoCheck = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid gray;
  margin-left: 20px;
`;

const TodoWrap = styled.div`
  display: flex;
  width: 66vw;
  gap: 20px;
`;

const TodoBox1 = styled.div``;

const TodoBox2 = styled.div``;

const TodoName = styled.div``;

const TodoItem2 = styled.div`
  width: 30vw;
  height: 50px;
  border: 1px solid gray;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background-color: #ede9fe;
`;

const TodoName2 = styled.div`
  text-decoration: line-through;
`;

const TodoCheckDone = styled.div`
  font-size: 25px;
  margin-left: 20px;
`;

const TodoItemWrap = styled.div``;

const TodoItemWrap2 = styled.div``;

const DeleteBtn = styled.button`
  background-color: #f43f5e;
  width: 13vw;
  height: 52px;
  border-radius: 40px;
  color: white;
  margin-top: 10px;
  cursor: pointer;
  border: 2px solid #0f172a;
`;

const EditBtn = styled.button`
  background-color: #e2e8f0;
  width: 13vw;
  height: 52px;
  border-radius: 40px;
  color: black;
  margin-top: 10px;
  cursor: pointer;
  border: 2px solid #0f172a;
  margin-right: 20px;
`;

const InputTodo = styled.input`
  width: 30vw;
  height: 50px;
  border: 1px solid gray;
  border-radius: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background-color: #ede9fe;
  padding-left: 20px;
`;

type Todo = {
  id: number;
  name: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoArr, setTodoArr] = useState<Todo[]>([]);
  const [done, setDone] = useState<boolean>(false);
  const tempArr: Todo[] = [];
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [doneBtnOpen, setDoneBtnOpen] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>("");

  const postHandler = () => {
    axios
      .post("https://assignment-todolist-api.vercel.app/api/ehdgus5338/items", {
        name: text,
      })
      .then((res) => {
        if (res) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    axios
      .get("https://assignment-todolist-api.vercel.app/api/ehdgus5338/items")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      });
  }, []);

  const doneHandler = (ele: Todo, idx: number) => {
    for (let i = 0; i < todos.length; i++) {
      if (i === idx) {
        continue;
      } else {
        tempArr.push(todos[i]);
      }
    }
    setTodos(tempArr);
    setTodoArr([...todoArr, ele]);
    setDone(true);
  };

  // const onChange = (e) => {
  //   axios
  //     .post(
  //       "https://assignment-todolist-api.vercel.app/api/ehdgus5338/images/upload",
  //       { url: e.target.files[0].name },
  //     )
  //     .then((res) => console.log(res));
  // };

  const deleteHandler = (id: number) => {
    axios
      .delete(
        `https://assignment-todolist-api.vercel.app/api/ehdgus5338/items/${id}`,
      )
      .then((res) => window.location.reload());
  };

  const inputOpenHandler = () => {
    setInputOpen(true);
    setDoneBtnOpen(true);
  };

  const editHandler = (id: number) => {
    axios
      .patch(
        `https://assignment-todolist-api.vercel.app/api/ehdgus5338/items/${id}`,
        {
          name: editValue,
        },
      )
      .then((res) => window.location.reload());
  };

  return (
    <Container>
      <HeaderWrap>
        <Header>
          <Image
            src="/img/codeitLogo.png"
            width={151}
            height={40}
            alt="Codeit logo"
          />
        </Header>
      </HeaderWrap>
      <AddBox>
        <Input
          placeholder="할일을 추가해주세요!"
          onChange={(e) => setText(e.target.value)}
        />

        <Button onClick={postHandler}>추가하기</Button>
      </AddBox>

      <MainBox>
        <CheckBox>
          <TodoBox>Todo</TodoBox>
          <DoneBox>Done</DoneBox>
        </CheckBox>

        <TodoWrap>
          <TodoBox1>
            {todos.map((ele, idx) => {
              return (
                <TodoItemWrap key={ele.id}>
                  {inputOpen ? (
                    <InputTodo
                      placeholder="수정할 할일을 적어주세요!"
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <TodoItem>
                      <TodoCheck
                        onClick={() => doneHandler(ele, idx)}
                      ></TodoCheck>
                      <TodoName>{ele.name}</TodoName>
                      <div></div>
                    </TodoItem>
                  )}
                  {doneBtnOpen ? (
                    <EditBtn onClick={() => editHandler(ele.id)}>완료</EditBtn>
                  ) : (
                    <EditBtn onClick={() => inputOpenHandler()}>수정</EditBtn>
                  )}
                  <DeleteBtn onClick={() => deleteHandler(ele.id)}>
                    삭제
                  </DeleteBtn>
                  {/* <TodoInput type="file" accept="image/*" onChange={onChange} /> */}
                </TodoItemWrap>
              );
            })}
          </TodoBox1>
          <TodoBox2>
            {todoArr.map((ele) => {
              return (
                <TodoItemWrap2 key={ele.id}>
                  {inputOpen ? (
                    <InputTodo
                      placeholder="수정할 할일을 적어주세요!"
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <TodoItem2>
                      <TodoCheckDone>✅</TodoCheckDone>
                      <TodoName2>{ele.name}</TodoName2>
                      <div></div>
                    </TodoItem2>
                  )}
                  {doneBtnOpen ? (
                    <EditBtn onClick={() => editHandler(ele.id)}>완료</EditBtn>
                  ) : (
                    <EditBtn onClick={() => inputOpenHandler()}>수정</EditBtn>
                  )}
                  <DeleteBtn onClick={() => deleteHandler(ele.id)}>
                    삭제
                  </DeleteBtn>
                </TodoItemWrap2>
              );
            })}
          </TodoBox2>
        </TodoWrap>
      </MainBox>
    </Container>
  );
}
