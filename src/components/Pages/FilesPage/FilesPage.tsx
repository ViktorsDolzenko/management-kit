import React from "react";
import { Layout } from "../../layout/Layout";
import "./filesPage.scss";

export const FilesPage = () => {
  return (
    <Layout pageTitle="TodoEx Files">
      <div className="page-container__filesPage">
        <div className="filesPage">
          <div className="filesPage__data">
            <div className="filesPage__data_images">
              <span>Image</span>
            </div>
            <div className="filesPage__data_names">
              <span>Name</span>
            </div>
            <div className="filesPage__data_sizes">
              <span>Size</span>
            </div>
            <div className="filesPage__data_uploader">
              <span>Uploaded By</span>
            </div>
            <div className="filesPage__data_tag">
              <span>Tag</span>
            </div>
            <div className="filesPage__data_date">
              <span>Date</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
