// admin/src/components/InputField/index.js
import React, { useState } from "react";
import { TextInput, BaseButton, Flex, Field } from "@strapi/design-system";
import PropTypes from "prop-types";
import IconsModal from "./IconsModal";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const IconPickerToggle = styled(BaseButton)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ theme }) => theme.spaces[8.5]};
  height: ${({ theme }) => theme.spaces[8.5]};
  svg {
    width: ${({ theme }) => theme.spaces[6]};
    height: ${({ theme }) => theme.spaces[6]};
  }

  svg > path {
    fill: ${({ theme }) => theme.colors.neutral500};
    justify-self: flex-end;
  }
`;
const InputField = (
  attribute,
  description,
  disabled,
  error,
  intlLabel,
  labelAction,
  name,
  onChange,
  required,
  value
) => {
  const [showIconModal, setShowIconModal] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(attribute.value);
  const handleSubmit = (icon) => {
    attribute.onChange
      ? attribute.onChange({
          target: {
            name: attribute.name,
            value: icon,
            type: attribute.type,
          },
        })
      : "";
    setCurrentIcon(icon);
  };
  const handleClose = () => {
    setShowIconModal(!showIconModal);
  };
  return (
    <Field name={attribute.name} id={attribute.name}>
      {showIconModal ? (
        <IconsModal
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          attribute={attribute}
        />
      ) : null}
      <Flex justifyContent="space-between">
        <TextInput
          placeholder="Icon class"
          label={attribute.name}
          name="text"
          hint="Max 140 characters"
          onChange={(e) => handleSubmit(e.target.value)}
          value={attribute.value}
        />
        <IconPickerToggle onClick={handleClose}>
          {currentIcon ? <FontAwesomeIcon icon={currentIcon} /> : "Select"}
        </IconPickerToggle>
      </Flex>
    </Field>
  );
};

InputField.defaultProps = {
  description: null,
  disabled: false,
  error: null,
  labelAction: null,
  required: false,
  value: "",
};

InputField.propTypes = {
  intlLabel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  labelAction: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
};
export default InputField;
