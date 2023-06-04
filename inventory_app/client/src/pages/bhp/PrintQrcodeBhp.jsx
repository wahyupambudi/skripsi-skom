import React, { useEffect } from "react";
import Layout from "../Layout";
import PrintQrcodeBhp from "../../components/bhp/PrintQrcodeBhp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <PrintQrcodeBhp />
    </Layout>
  );
};

export default Products;
