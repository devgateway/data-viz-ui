import { connect } from 'react-redux';
import MobileCarousel from './mobile';
import DesktopCarousel from './desktop';
import getDeviceType from '@/utils/deviceType';

const mapStateToProps = (state) => {
  const pageModuleProps = state.getIn(["data", "pageModuleProps"]);
  const _props = {};
  if (pageModuleProps) {
    _props.pageModuleProps = pageModuleProps;
  }
  return _props;
};

const mapActionCreators = {};

const CarouselWrapper = (props) => {
  const { pageModuleProps } = props;

  let SelectedCarousel;

  if (pageModuleProps?.editing && pageModuleProps?.previewMode) {
    const desktop = pageModuleProps?.previewMode === 'Desktop';
    if (desktop) {
      SelectedCarousel = DesktopCarousel;
    } else {
      SelectedCarousel = MobileCarousel;
    }
  } else {
    if(['tablet', 'mobile', 'midTablet'].includes(getDeviceType())) {
      SelectedCarousel = MobileCarousel;
    } else {
      SelectedCarousel = DesktopCarousel;
    }
  }
  return <SelectedCarousel {...props} />;
};

export default connect(mapStateToProps, mapActionCreators)(CarouselWrapper);
