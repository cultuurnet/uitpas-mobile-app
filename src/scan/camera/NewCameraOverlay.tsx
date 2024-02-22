import React, { type FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const NewCameraOverlay: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.unfocusedArea} />

        <View style={styles.focusedArea}>
          <View style={styles.unfocusedArea} />
          <View style={styles.clearArea} />
          <View style={styles.unfocusedArea} />
        </View>

        <View style={styles.unfocusedArea} />
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsText}>Align barcode within area to scan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clearArea: {
    backgroundColor: 'transparent',
    borderColor: 'peachpuff',
    // light pink
    borderWidth: 2,

    flex: 6,
  },
  container: {
    flex: 1,
  },
  focusedArea: {
    flex: 2,
    flexDirection: 'row',
  },
  instructions: {
    // backgroundColor: 'rgba(0,0,0,0.5)',
    bottom: 0,
    left: 0,
    padding: 32,
    position: 'absolute',
    right: 0, // light blue
  },
  instructionsText: {
    color: '#fff',
    fontSize: 18,

    fontWeight: '400',
    // light pink
    textAlign: 'center',
  },
  overlay: {
    bottom: 0,
    flex: 1,
    flexDirection: 'column',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  unfocusedArea: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1, // light blue
  },
});
