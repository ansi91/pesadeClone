import React, { useState, useEffect } from "react";
import "../../css/mypage.css";
import SubTitle from "../../components/SubTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import OrderResult from "../../components/order/OrderResult.jsx";
import axios from "axios";
import { getUser } from "../../util/localStorage";

export default function MyPageOrder() {
  const location = useLocation();
  const userId = getUser().userId;
  const [activeButton, setActiveButton] = useState(1);
  const [activeDate, setActiveDate] = useState(3);
  const [cancleList, setcancleList] = useState([]);

  useEffect(()=>{
    axios({
      method: "POST",
      url: 'http://localhost:8080/order/canclelist',
      data: { userId: userId }
    }).then(result => {
      console.log('API Response:', result.data);
      setcancleList(Array.isArray(result.data) ? result.data : []);
    }).catch(error => {
      console.error("There was an error fetching the cancel list!", error);
     
    });
  },[cancleList])

  const clickChange = (index) => {
    setActiveButton(index);
    
    console.log(cancleList);
  };

  const dateChange = (index) => {
    setActiveDate(index);
  };

  return (
    <div>
      <SubTitle title="Order & Shipping" />
      <div className="myorder">
        <ul className="myorder-title">
          <button
            className={`myorderbutton ${activeButton === 1 ? "active" : ""}`}
            onClick={() => clickChange(1)}
          >
            주문내역 조회 
          </button>
          <button
            className={`myorderbutton ${activeButton === 2 ? "active" : ""}`}
            onClick={() => clickChange(2)}
          >
            취소/교환/반품 내역 
          </button>
        </ul>
        {activeButton === 1 && (
          <div className="myorderselect-content">
            <ul className="myorder-select">
              <p>상태</p>
              <select name="" id="" className="myorder-selectbox">
                <option value="" style={{ backgroundColor: "transparent" }}>
                  전체 주문처리과정
                </option>
                <option value="undeposit">입금전</option>
                <option value="ready">배송준비중</option>
                <option value="shipping">배송중</option>
                <option value="shipped">배송완료</option>
                <option value="delete">취소</option>
                <option value="exchange">교환</option>
                <option value="cancel">반품</option>
              </select>
            </ul>
            <ul className="myorder-select">
              <p>기간</p>
              <button
                className={`myorderdate ${activeDate === 1 ? "active" : ""}`}
                onClick={() => dateChange(1)}
              >
                오늘
              </button>
              <button
                className={`myorderdate ${activeDate === 2 ? "active" : ""}`}
                onClick={() => dateChange(2)}
              >
                1개월
              </button>
              <button
                className={`myorderdate ${activeDate === 3 ? "active" : ""}`}
                onClick={() => dateChange(3)}
              >
                3개월
              </button>
              <button
                className={`myorderdate ${activeDate === 4 ? "active" : ""}`}
                onClick={() => dateChange(4)}
              >
                6개월
              </button>
              <button
                className={`myorderdate ${activeDate === 5 ? "active" : ""}`}
                onClick={() => dateChange(5)}
              >
                기간설정
              </button>
            </ul>
            <p className="myorderselect-warning-text">
              <FontAwesomeIcon icon={faTriangleExclamation} /> 취소/교환/반품
              신청은 주문 완료일 기준 7일까지 가능합니다.
            </p>
            <OrderResult />
          </div>
        )}
        {activeButton === 2 && (
          <div className="myorderselect-content">
            <ul className="myorder-select">
              <p>기간</p>
              <button
                className={`myorderdate ${activeDate === 1 ? "active" : ""}`}
                onClick={() => dateChange(1)}
              >
                오늘
              </button>
              <button
                className={`myorderdate ${activeDate === 2 ? "active" : ""}`}
                onClick={() => dateChange(2)}
              >
                1개월
              </button>
              <button
                className={`myorderdate ${activeDate === 3 ? "active" : ""}`}
                onClick={() => dateChange(3)}
              >
                3개월
              </button>
              <button
                className={`myorderdate ${activeDate === 4 ? "active" : ""}`}
                onClick={() => dateChange(4)}
              >
                6개월
              </button>
              <button
                className={`myorderdate ${activeDate === 5 ? "active" : ""}`}
                onClick={() => dateChange(5)}
              >
                기간설정
              </button>
            </ul>
            <p className="myorderselect-warning-text">
              <FontAwesomeIcon icon={faTriangleExclamation} /> 취소/교환/반품
              신청은 주문 완료일 기준 7일까지 가능합니다.
            </p>
            {Array.isArray(cancleList) && cancleList.length === 0 ? (
              <p className="myorder-orderlist">
                취소/교환/반품 내역이 없습니다.
              </p>
            ) : (
              <div>
                <ul>
               {
                 cancleList.map((obj)=>(
                      <li>{obj.order_number}</li>
                  
                ))
              }
              </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
