import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../redux/Action";
import { PUBLIC_ASSETS_PATH } from "../redux/Constants";
import Card from "./Card";
import { Drawer } from "antd";
import "./CSS/Header.css";
const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.Reducer.getAllData);
  const [sortedData, setSortedData] = useState();
  const [optionValue, setOptionValue] = useState();
  const [searchValue, setSearchValue] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllData());
    setSortedData(data);
  }, [dispatch, data.length]);

  useEffect(() => {
    if (searchValue === "") {
      setSortedData(data);
    } else {
      const searchData = data.filter((item) => {
        return Object?.values(item)
          ?.join("")
          ?.toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setSortedData(searchData);
    }
  }, [searchValue]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setOptionValue(e.target.value);
    if (e.target.value === "nameAtoZ") {
      const sorted = [...sortedData].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setSortedData(sorted);
    } else if (e.target.value === "nameZtoA") {
      const sorted = [...sortedData].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setSortedData(sorted);
    } else if (e.target.value === "highprice") {
      const sorted = [...sortedData].sort((a, b) => {
        return b.price - a.price;
      });
      setSortedData(sorted);
    } else if (e.target.value === "lowprice") {
      const sorted = [...sortedData].sort((a, b) => {
        return a.price - b.price;
      });
      setSortedData(sorted);
    } else if (e.target.value === "highrate") {
      const sorted = [...sortedData].sort((a, b) => {
        return b.rating.rate - a.rating.rate;
      });
      setSortedData(sorted);
    } else if (e.target.value === "lowrate") {
      const sorted = [...sortedData].sort((a, b) => {
        return a.rating.rate - b.rating.rate;
      });
      setSortedData(sorted);
    } else {
      setSortedData(data);
      setOptionValue("");
      setSearchValue("");
    }
  };
  const handleSearch = (e) => {
    setOptionValue("");
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <img
            src={PUBLIC_ASSETS_PATH + "/copilotly.png"}
            className="headerImg"
          />
        </div>
        <div className="dekstopView">
          <div className="btn sort-button">
            SortBy :
            <select onChange={(e) => handleChange(e)} value={optionValue}>
              <option hidden value="">
                select
              </option>
              <option value="nameAtoZ">Name A to Z</option>
              <option value="nameZtoA">Name Z to A</option>
              <option value="highprice">High Price</option>
              <option value="lowprice">Low Price</option>
              <option value="highrate">High rating</option>
              <option value="lowrate">Low rating</option>
              <option value="reset">Reset</option>
            </select>
          </div>
          <div className="header-right">
            <div className="search-form">
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e)}
                value={searchValue}
              />
              <div className="search-btn">
                <img
                  src={PUBLIC_ASSETS_PATH + "/search.png"}
                  className="searchIcon"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mobileView">
          <div onClick={showDrawer}>
            <img
              src={PUBLIC_ASSETS_PATH + "/menu.png"}
              className="drawerIcon"
            />
          </div>
          <Drawer
            placement="top"
            width={300}
            onClose={onClose}
            open={open}
            className="drawer"
          >
            <div class="searchbar">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearch(e)}
                value={searchValue}
              />
              <img
                src={PUBLIC_ASSETS_PATH + "/search.png"}
                className="searchIcon"
              />
            </div>

            <div className="btn sort-button">
              SortBy :
              <select onChange={(e) => handleChange(e)} value={optionValue}>
                <option hidden value="">
                  select
                </option>
                <option value="nameAtoZ">Name A to Z</option>
                <option value="nameZtoA">Name Z to A</option>
                <option value="highprice">High Price</option>
                <option value="lowprice">Low Price</option>
                <option value="highrate">High rating</option>
                <option value="lowrate">Low rating</option>
                <option value="reset">Reset</option>
              </select>
            </div>
          </Drawer>
        </div>
      </header>

      <Card data={sortedData} />
    </div>
  );
};

export default Home;
