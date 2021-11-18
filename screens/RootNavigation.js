import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()
import {StackActions} from '@react-navigation/native';
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function navigateReplace(name, param, role, user) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, {
        name: param,
        role : role,
        user : user,
      }),
    );
  }
}
