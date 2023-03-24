import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./DirectoryItem.styles.jsx";
import { BackgroundImage, Body, DirectoryItemContainer } from './DirectoryItem.styles.jsx';

const DirectoryItem = ({category}) => {
    const navigate = useNavigate();
    const {imageUrl, title, route} = category;

    const navigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={navigateHandler}>
    <BackgroundImage
    imageUrl = {imageUrl}
    />
    <Body>
      <h2>{title}</h2>
      <p>Shop Now</p>
    </Body>
  </DirectoryItemContainer>
  )
}

export default DirectoryItem;