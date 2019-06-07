/* @flow strict-local */
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import format from 'date-fns/format';
import type { TimingItemType } from '../types';

import { RawLabel } from '../common';
import { numberWithSeparators } from '../utils/misc';

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: 'hsla(0, 0%, 49.8%, 0.25)',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    opacity: 0.9,
  },
});

export default class TimeItem extends PureComponent<TimingItemType> {
  props: TimingItemType;

  render() {
    const { text, startMs, endMs } = this.props;
    const startStr = format(startMs, 'HH:mm:ss.S'); // eslint-disable-line
    const durationStrMs = numberWithSeparators(endMs - startMs);
    const timingStr = `Start: ${startStr}   Duration: ${durationStrMs} ms`;

    return (
      <View style={styles.item}>
        <RawLabel style={styles.label} text={text} />
        <RawLabel style={styles.value} text={timingStr} />
      </View>
    );
  }
}
