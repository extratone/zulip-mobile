/* @flow strict-local */
import React, { useContext } from 'react';
import type { Node } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { LocalizableReactText } from '../types';
import styles, { ThemeContext, NAVBAR_SIZE } from '../styles';
import Label from '../common/Label';
import NavBarBackButton from './NavBarBackButton';

type Props = $ReadOnly<{|
  canGoBack: boolean,
  title: LocalizableReactText,
|}>;

export default function ModalNavBar(props: Props): Node {
  // Layout from https://material.io/components/app-bars-top :
  //  * When we do have a back button, we want 32px between icon and text,
  //    and 16px before icon.  See handy spec diagrams at end of page.
  //
  //  * With no back button, we want 12px before start of text.  (This isn't
  //    explicit in the guidelines, but see an example without back button
  //    under "Cross-platform adaptation".  Zoom in and compare to the
  //    neighboring example where there is one; this example has a bit less
  //    padding than that one, which should have 16px.)
  //
  //  * At end of text, always put 12px, as we never have a button there.
  //    (This isn't clear either, but use 12px for symmetry with start.)
  //
  // And the `NavBarBackButton` comes with 12px padding around icon and
  // wants another 4px padding at start.

  const { canGoBack, title } = props;
  const { backgroundColor } = useContext(ThemeContext);
  const textStyle = [
    styles.navTitle,
    { flex: 1 },
    canGoBack ? { marginStart: 20, marginEnd: 8 } : { marginHorizontal: 8 },
  ];

  return (
    <SafeAreaView
      mode="padding"
      edges={['top', 'right', 'left']}
      style={{
        minHeight: NAVBAR_SIZE,
        borderColor: 'hsla(0, 0%, 50%, 0.25)',
        borderBottomWidth: 1,
        backgroundColor,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {canGoBack && <NavBarBackButton />}
      <Label style={textStyle} text={title} numberOfLines={1} ellipsizeMode="tail" />
    </SafeAreaView>
  );
}
