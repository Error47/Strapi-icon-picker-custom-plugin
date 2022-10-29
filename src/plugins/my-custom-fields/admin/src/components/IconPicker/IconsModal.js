// admin/src/components/TaskModal/index.js
import React, { useState } from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
} from "@strapi/design-system";
import { icons } from "./icons";

const IconsModal = ({ handleClose, attribute, handleSubmit }) => {
  const [currentIcon, setCurrentIcon] = useState(attribute.value);
  const handleCallback = async (e) => {
    e.preventDefault();
    await handleSubmit(currentIcon);
    handleClose();
  };
  return (
    <ModalLayout onClose={handleClose} labelledBy="title" as="form">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Select Icon
        </Typography>
      </ModalHeader>
      <ModalBody>
        <ul class="icon-picker-list">
          {icons.map((item, index) => (
            <li>
              <a
                className={`${currentIcon == item.icon ? "active" : ""}`}
                onClick={() => setCurrentIcon(item.icon)}
                key={index}
              >
                <span className={item.icon}></span>
                <span className="name-class">{item.icon}</span>
              </a>
            </li>
          ))}
        </ul>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={handleClose} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <Button
            type="button"
            onClick={handleCallback}
            loading={status === "loading"}
          >
            {status === "loading" ? "Saving..." : "Save"}
          </Button>
        }
      />
      <style>
        {`.icon-picker-list {
	display: flex;
	flex-flow: row wrap;
	list-style: none;
	padding-left: 0;
}

.icon-picker-list li {
	display: flex;
	flex: 0 0 20%;
	float: left;
	width: 20%;
}

.icon-picker-list a {
	background-color: #f9f9f9;
	border: 1px solid #fff;
	color: black;
	display: block;
	flex: 1 1 auto;
	font-size: 12px;
	line-height: 1.4;
	min-height: 100px;
	padding: 10px;
	text-align: center;
	user-select: none;
}

.icon-picker-list a:hover,
.icon-picker-list a.active{
	background-color: #009E49;
	color: #fff;
	cursor: pointer;
	text-decoration: none;
}

.icon-picker-list .fa {
	font-size: 24px;
	margin-bottom: 10px;
	margin-top: 5px;
}

.icon-picker-list .name-class {
	display: block;
	text-align: center;
	word-wrap: break-word;
}`}
      </style>
    </ModalLayout>
  );
};

export default IconsModal;
