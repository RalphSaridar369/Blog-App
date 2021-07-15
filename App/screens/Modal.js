

const Window = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      
      <Button title="Open Modal" onPress={() => setVisible(true)} />
    </View>
  );
};


export default Window;