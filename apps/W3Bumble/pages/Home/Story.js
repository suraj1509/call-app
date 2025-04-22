import { View, FlatList } from 'react-native'
import React from 'react'
import StoryItem from '../components/StoryItem';
import { IMAGES } from '../../../../app/constants/theme';

const StoryData = [
    {
        id: '1',
        title: 'Emily',
        image: IMAGES.userPic12,
        storyItem : [
            IMAGES.slderPic6,
            IMAGES.slderPic12,
        ] 
    },
    {
        id: '2',
        title: 'Sophia',
        image: IMAGES.userPic10,
        storyItem : [
            IMAGES.slderPic14,
            IMAGES.slderPic12,
        ] 
    },
    {
        id: '3',
        title: 'Charlotte',
        image: IMAGES.userPic9,
        storyItem : [
            IMAGES.slderPic12,
            IMAGES.slderPic14,
        ] 
    },
    {
        id: '4',
        title: 'Harper',
        image: IMAGES.userPic11,
        storyItem : [
            IMAGES.slderPic15,
            IMAGES.slderPic12,
        ] 
    },
    {
      id: '5',
      title: 'Emily',
      image: IMAGES.userPic12,
      storyItem : [
          IMAGES.slderPic6,
          IMAGES.slderPic12,
      ] 
  },
  {
      id: '6',
      title: 'Sophia',
      image: IMAGES.userPic10,
      storyItem : [
          IMAGES.slderPic14,
          IMAGES.slderPic12,
      ] 
  },
  {
      id: '7',
      title: 'Charlotte',
      image: IMAGES.userPic9,
      storyItem : [
          IMAGES.slderPic12,
          IMAGES.slderPic14,
      ] 
  },
  {
      id: '8',
      title: 'Harper',
      image: IMAGES.userPic11,
      storyItem : [
          IMAGES.slderPic15,
          IMAGES.slderPic12,
      ] 
  },
];


const Story = ({theme,backgroundColor}) => {

    const { colors } = theme;

    return (
    <View style={{marginHorizontal:-15}}>
        <FlatList
            contentContainerStyle={{paddingLeft:10,paddingTop:5}}  
            horizontal
            data={StoryData}
            renderItem={({ item }) => {
                return (
                    <StoryItem
                        title={item.title}
                        image={item.image}
                        storyItem={item.storyItem}
                        id={ item.id}
                        backgroundColor={backgroundColor}
                    />
                );
            }}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 10}}
        />
    </View>
  )
}

export default Story