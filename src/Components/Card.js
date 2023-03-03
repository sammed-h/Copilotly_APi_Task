import React, { useState } from "react";
import { PUBLIC_ASSETS_PATH } from "../redux/Constants";
import "./CSS/Card.css";
import "./CSS/Modal.css";

function Card({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [singleData, setSingleData] = useState("");
  const handleClick = (id) => {
    console.log(id);
    setOpenModal(true);
    const SingleProduct = data.filter((x) => {
      return x.id === id;
    });
    setSingleData(SingleProduct);
  };
  return (
    <div className="productGrid">
      {data != undefined &&
        data?.map((item, id) => {
          const originalPrice = item.price * 2.5;
          const title = item.title.substr(0, 20);
          return (
            <div
              className="cardContainer"
              key={id}
              onClick={() => handleClick(item.id)}
            >
              <div className="imgSectionMain">
                <img className="imgSection" src={item.image} />
                <div
                  style={{ display: "flex", flexDirection: "row" }}
                  className="productRatting"
                >
                  <span style={{ marginRight: "2px" }}>{item.rating.rate}</span>
                  <span style={{ marginTop: "2px" }}>
                    <img
                      src={PUBLIC_ASSETS_PATH + "/star.png"}
                      className="starIcon"
                      alt="star_png"
                    />
                  </span>
                  <span style={{ marginLeft: "12px" }}>
                    {item.rating.count}
                  </span>
                </div>
              </div>
              <div className="cardSlate"></div>

              <div className="cardDetails">
                <h3 className="productBrand"> {title} </h3>

                <p className="cardP" style={{ fontSize: "16px" }}>
                  {title}
                </p>

                <div className="priceContainer">
                  <span className="productPrice">
                    Rs.{parseInt(item.price)}
                  </span>
                  <span className="productMRP">
                    Rs.{parseInt(originalPrice)}
                  </span>
                  <span className="productDiscount">
                    (Rs. {parseInt(originalPrice - item.price)}
                    OFF)
                  </span>
                </div>
                <div className="overlay">
                  <button className="wishBtn">
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={PUBLIC_ASSETS_PATH + "/heart.png"}
                        className="heartIcon"
                        alt="star_png"
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          fontWeight: "600",
                        }}
                      >
                        WISHLIST
                      </span>
                    </div>
                  </button>
                  <span className="productSize">Sizes : XS, S, M, L, XL</span>
                </div>
              </div>
            </div>
          );
        })}

      {/* modal starts here */}
      {openModal &&
        singleData?.map((item, index) => {
          const description = item.description.substr(0, 250);
          return (
            <div className="modal-wrapper">
              <div
                className="modal-backdrop"
                onClick={() => setOpenModal(!openModal)}
              />
              <div className="modal-box">
                <div>
                  <h3> PRODUCT DETAILS</h3>
                  <img src={item.image} className="singleImage" />
                  <div>
                    <div className="BtnFlex">
                      <button className="buyButton">
                        <img
                          src={PUBLIC_ASSETS_PATH + "/bag.png"}
                          style={{
                            height: "15px",
                            width: "15px",
                            marginRight: "10px",
                          }}
                        />
                        BuyNow
                      </button>
                      <button className="wishBtn">
                        <img
                          src={PUBLIC_ASSETS_PATH + "/heart.png"}
                          style={{
                            height: "15px",
                            width: "15px",
                            marginRight: "10px",
                          }}
                        />
                        WishList
                      </button>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <p>
                        <strong>ProductName:</strong> {item.title}
                      </p>
                      <p className="description">
                        <strong> Description:</strong> {description}
                      </p>
                      <p>
                        <strong> Best Price :</strong>
                        <span className="mrpDiscount"> Rs {item.price}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpenModal(!openModal)}
                  className="closeBtn"
                >
                  Close
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Card;
