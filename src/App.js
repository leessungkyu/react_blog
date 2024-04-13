import React, {useState} from 'react'  //일부분만 갱신하겠다 
import logo from './logo.svg';
import './App.css';

// html코드를 작성하려면 return() 안에 작성
// css를 사용하려면 import를 사용  : import './App.css'
// class -> className : 자바스크립트에 이미 class라는 명령어가 중복되어 변경
// - 표시는 뺼셈으로 취급하기 때문에 대문자로 작성
// ex)font-size   =>  fontSize
// 변수를 사용할때는 {}로 이용
// style은 object 자료형으로 작성  style={{fontSize:'16px', color:'red'}}
// return() 안에는 가장 바깥에는 하나의 태그만

// 리액트 : 변수가 바뀌면 화면이 바뀌는 useState (웹페이지를 다시 불러올 필요가 없음)
// import React, {useState} from 'react'
// 리액트는 화면에 보여줄 값을 '변수'에 보관하지 않고 'state'에 보관
// 변수는 값이 변경되어도 화면에 반영되지 않지만, useState라는 것을 사용하면 값이 바뀌면
// 화면도 따라서 바뀜(데이터 바인딩)
// 따라서, 변경될만한 값은 useState로 보관하고, 변경이 안될 값은 변수에 보관

function App() { 
  //자바스크립와 같이 작성 가능
  let 변수 = '블로그 글목록'     //html 안에서 사용하려면 {} 필요
  let [value, setValue] = useState('서버에서 실시간으로 받는 값')
  //사용할때는 value, 변경할때는 setValue 
  let [title,setTitle] = useState (['제목1','제목2','제목3','제목4'])
  let [dateTime, setDateTiem] = useState(['2024.04.13','2024.04.12','2024.03.29','2024.02.28'])
  let [score,setScore] = useState([0,0,0,0])
  // useStaet로 false
  let [modal,setModal] = useState(false)
  let [curIdx, setCurIdx] = useState(0)
  //모달창이 열릴때 몇번째 항목이 열렸는지 구분
  let [content,setContent] = useState(['상세내용1'])


  //return 안에는 html코드 작성(자바스크립트 사용하려면 {} 필요)
  return (
    <div className="App">
        <div className="black-nav">
          <img src={logo} width={'100px'} height={'100px'} alt="" />
          <h4 style={{color:'yellowgreen', fontSize:'20px'}}>{변수}</h4>
        </div>  
          {
            /*
              리액트에서 {}안에 반복문은 for가 아니라 map으로 한다.
              왜냐하면 for(){}에서 중괄호가 중복되기 때문에 map으로 제공

              배열.map()
              list클래스를 title의 객수만큼 반복
              map 가장 바깥 태그에 구분할 수 있는 key를 적어주기
            */
              title.map(function(element, idx){
                return(
                    <div className="list" key={idx}>
                      <h4 onClick={(e)=>{
                        e.stopPropagation()
                        setCurIdx(idx)
                        setModal(!modal)
                      }}>{element} <span onClick={(e)=>{
                        // 자바스크립트에서 배열요소를 수정하려면 분해했다가 변경하고 다시 합쳐야함
                        e.stopPropagation()
                        setScore(()=>{
                          let src = [...score]  //score배열을 분할하고 다시 배열로 구성
                          src[idx] += 1
                          return src
                        })
                      }}>💚</span> {score[idx]}</h4> 
                      <p>{dateTime[idx]} 작성</p>
                    </div>   
                )}
              )           
          }
          {
            /* 부분만 떼고 싶으면 컴포넌트로 만든다.    
              modal값이 false면 안보이게, true면 보이게 변경
              {}안에다가 자바스크립트 코드를 넣어야하는데
              if랑 for가 {}를 사용하므로
              리액트 {}안에서는 if와 for 사용이 불가능 => {} 중복때문에 

              if는 삼항연산자로,
              for는 map으로 제공

              삼항연산자란? 
              조건식 ? 맞으면 실행할코드 : 틀리면 실행할 코드
              3 > 1 ? true : false

              madal 상태가 true면 <Modal /> 컴포넌트 적용, false면 아무것도 없게 적용
              h4태그에 onclick을 넣고 setModal을 true로 넣게

              다른 컴포넌트에 값을 넘겨줄때는 props라는 것을 사용
              컴포넌트에 속성주듯이 값을 전달가능
            */
              
              modal == true ?  <Modal idx={curIdx} title={title} date={dateTime}/> : null 
          }        
    </div>
  );
}

export default App;

{/* {
      // useState값을 변경하려면 뒤에있는 변수를 사용
      // 버튼을 누르면 setValue를 통해서 value값 변경
    }  

    <button onClick={()=>{
      setValue('변경할 값')
    }}>state값 변경</button>   */}


// modal 컴포넌트
// 코드가 길어지면 별도의 함수로 분리해서 '컴포넌트'로 만들어준다
// returnm()안에 htmnl태그 작성
// 사용하고자 하는 곳에 <함수명 />
// 컴포넌트의 경우 html태그와 중복이 있을수 있으므로 대문자로 시작
// 일반함수는 소문자로 시작
function Modal(props){
  return (
    <>
      <div className="modal">
          <h4>{props.title[props.idx]}</h4>
          <p>{props.date[props.idx]}</p>
          <p>상세 내용</p>
      </div>
    </>
  )
}
