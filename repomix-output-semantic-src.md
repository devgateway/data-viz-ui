This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
addons/
  Confirm/
    Confirm.d.ts/
      Confirm.d.ts
    Confirm.js/
      Confirm.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Pagination/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Pagination.d.ts/
      Pagination.d.ts
    Pagination.js/
      Pagination.js
    PaginationItem.d.ts/
      PaginationItem.d.ts
    PaginationItem.js/
      PaginationItem.js
  Portal/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Portal.d.ts/
      Portal.d.ts
    Portal.js/
      Portal.js
    PortalInner.d.ts/
      PortalInner.d.ts
    PortalInner.js/
      PortalInner.js
    usePortalElement.js/
      usePortalElement.js
    utils/
      useTrigger.js/
        useTrigger.js
      validateTrigger.js/
        validateTrigger.js
  Radio/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Radio.d.ts/
      Radio.d.ts
    Radio.js/
      Radio.js
  Select/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Select.d.ts/
      Select.d.ts
    Select.js/
      Select.js
  TextArea/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    TextArea.d.ts/
      TextArea.d.ts
    TextArea.js/
      TextArea.js
  TransitionablePortal/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    TransitionablePortal.d.ts/
      TransitionablePortal.d.ts
    TransitionablePortal.js/
      TransitionablePortal.js
collections/
  Breadcrumb/
    Breadcrumb.d.ts/
      Breadcrumb.d.ts
    Breadcrumb.js/
      Breadcrumb.js
    BreadcrumbDivider.d.ts/
      BreadcrumbDivider.d.ts
    BreadcrumbDivider.js/
      BreadcrumbDivider.js
    BreadcrumbSection.d.ts/
      BreadcrumbSection.d.ts
    BreadcrumbSection.js/
      BreadcrumbSection.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Form/
    Form.d.ts/
      Form.d.ts
    Form.js/
      Form.js
    FormButton.d.ts/
      FormButton.d.ts
    FormButton.js/
      FormButton.js
    FormCheckbox.d.ts/
      FormCheckbox.d.ts
    FormCheckbox.js/
      FormCheckbox.js
    FormDropdown.d.ts/
      FormDropdown.d.ts
    FormDropdown.js/
      FormDropdown.js
    FormField.d.ts/
      FormField.d.ts
    FormField.js/
      FormField.js
    FormGroup.d.ts/
      FormGroup.d.ts
    FormGroup.js/
      FormGroup.js
    FormInput.d.ts/
      FormInput.d.ts
    FormInput.js/
      FormInput.js
    FormRadio.d.ts/
      FormRadio.d.ts
    FormRadio.js/
      FormRadio.js
    FormSelect.d.ts/
      FormSelect.d.ts
    FormSelect.js/
      FormSelect.js
    FormTextArea.d.ts/
      FormTextArea.d.ts
    FormTextArea.js/
      FormTextArea.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Grid/
    Grid.d.ts/
      Grid.d.ts
    Grid.js/
      Grid.js
    GridColumn.d.ts/
      GridColumn.d.ts
    GridColumn.js/
      GridColumn.js
    GridRow.d.ts/
      GridRow.d.ts
    GridRow.js/
      GridRow.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Menu/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Menu.d.ts/
      Menu.d.ts
    Menu.js/
      Menu.js
    MenuHeader.d.ts/
      MenuHeader.d.ts
    MenuHeader.js/
      MenuHeader.js
    MenuItem.d.ts/
      MenuItem.d.ts
    MenuItem.js/
      MenuItem.js
    MenuMenu.d.ts/
      MenuMenu.d.ts
    MenuMenu.js/
      MenuMenu.js
  Message/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Message.d.ts/
      Message.d.ts
    Message.js/
      Message.js
    MessageContent.d.ts/
      MessageContent.d.ts
    MessageContent.js/
      MessageContent.js
    MessageHeader.d.ts/
      MessageHeader.d.ts
    MessageHeader.js/
      MessageHeader.js
    MessageItem.d.ts/
      MessageItem.d.ts
    MessageItem.js/
      MessageItem.js
    MessageList.d.ts/
      MessageList.d.ts
    MessageList.js/
      MessageList.js
  Table/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Table.d.ts/
      Table.d.ts
    Table.js/
      Table.js
    TableBody.d.ts/
      TableBody.d.ts
    TableBody.js/
      TableBody.js
    TableCell.d.ts/
      TableCell.d.ts
    TableCell.js/
      TableCell.js
    TableFooter.d.ts/
      TableFooter.d.ts
    TableFooter.js/
      TableFooter.js
    TableHeader.d.ts/
      TableHeader.d.ts
    TableHeader.js/
      TableHeader.js
    TableHeaderCell.d.ts/
      TableHeaderCell.d.ts
    TableHeaderCell.js/
      TableHeaderCell.js
    TableRow.d.ts/
      TableRow.d.ts
    TableRow.js/
      TableRow.js
elements/
  Button/
    Button.d.ts/
      Button.d.ts
    Button.js/
      Button.js
    ButtonContent.d.ts/
      ButtonContent.d.ts
    ButtonContent.js/
      ButtonContent.js
    ButtonGroup.d.ts/
      ButtonGroup.d.ts
    ButtonGroup.js/
      ButtonGroup.js
    ButtonOr.d.ts/
      ButtonOr.d.ts
    ButtonOr.js/
      ButtonOr.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Container/
    Container.d.ts/
      Container.d.ts
    Container.js/
      Container.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Divider/
    Divider.d.ts/
      Divider.d.ts
    Divider.js/
      Divider.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Flag/
    Flag.d.ts/
      Flag.d.ts
    Flag.js/
      Flag.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Header/
    Header.d.ts/
      Header.d.ts
    Header.js/
      Header.js
    HeaderContent.d.ts/
      HeaderContent.d.ts
    HeaderContent.js/
      HeaderContent.js
    HeaderSubheader.d.ts/
      HeaderSubheader.d.ts
    HeaderSubheader.js/
      HeaderSubheader.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Icon/
    Icon.d.ts/
      Icon.d.ts
    Icon.js/
      Icon.js
    IconGroup.d.ts/
      IconGroup.d.ts
    IconGroup.js/
      IconGroup.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Image/
    Image.d.ts/
      Image.d.ts
    Image.js/
      Image.js
    ImageGroup.d.ts/
      ImageGroup.d.ts
    ImageGroup.js/
      ImageGroup.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Input/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Input.d.ts/
      Input.d.ts
    Input.js/
      Input.js
  Label/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Label.d.ts/
      Label.d.ts
    Label.js/
      Label.js
    LabelDetail.d.ts/
      LabelDetail.d.ts
    LabelDetail.js/
      LabelDetail.js
    LabelGroup.d.ts/
      LabelGroup.d.ts
    LabelGroup.js/
      LabelGroup.js
  List/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    List.d.ts/
      List.d.ts
    List.js/
      List.js
    ListContent.d.ts/
      ListContent.d.ts
    ListContent.js/
      ListContent.js
    ListDescription.d.ts/
      ListDescription.d.ts
    ListDescription.js/
      ListDescription.js
    ListHeader.d.ts/
      ListHeader.d.ts
    ListHeader.js/
      ListHeader.js
    ListIcon.d.ts/
      ListIcon.d.ts
    ListIcon.js/
      ListIcon.js
    ListItem.d.ts/
      ListItem.d.ts
    ListItem.js/
      ListItem.js
    ListList.d.ts/
      ListList.d.ts
    ListList.js/
      ListList.js
  Loader/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Loader.d.ts/
      Loader.d.ts
    Loader.js/
      Loader.js
  Placeholder/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Placeholder.d.ts/
      Placeholder.d.ts
    Placeholder.js/
      Placeholder.js
    PlaceholderHeader.d.ts/
      PlaceholderHeader.d.ts
    PlaceholderHeader.js/
      PlaceholderHeader.js
    PlaceholderImage.d.ts/
      PlaceholderImage.d.ts
    PlaceholderImage.js/
      PlaceholderImage.js
    PlaceholderLine.d.ts/
      PlaceholderLine.d.ts
    PlaceholderLine.js/
      PlaceholderLine.js
    PlaceholderParagraph.d.ts/
      PlaceholderParagraph.d.ts
    PlaceholderParagraph.js/
      PlaceholderParagraph.js
  Rail/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Rail.d.ts/
      Rail.d.ts
    Rail.js/
      Rail.js
  Reveal/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Reveal.d.ts/
      Reveal.d.ts
    Reveal.js/
      Reveal.js
    RevealContent.d.ts/
      RevealContent.d.ts
    RevealContent.js/
      RevealContent.js
  Segment/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Segment.d.ts/
      Segment.d.ts
    Segment.js/
      Segment.js
    SegmentGroup.d.ts/
      SegmentGroup.d.ts
    SegmentGroup.js/
      SegmentGroup.js
    SegmentInline.d.ts/
      SegmentInline.d.ts
    SegmentInline.js/
      SegmentInline.js
  Step/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Step.d.ts/
      Step.d.ts
    Step.js/
      Step.js
    StepContent.d.ts/
      StepContent.d.ts
    StepContent.js/
      StepContent.js
    StepDescription.d.ts/
      StepDescription.d.ts
    StepDescription.js/
      StepDescription.js
    StepGroup.d.ts/
      StepGroup.d.ts
    StepGroup.js/
      StepGroup.js
    StepTitle.d.ts/
      StepTitle.d.ts
    StepTitle.js/
      StepTitle.js
generic.d.ts/
  generic.d.ts
index.js/
  index.js
lib/
  childrenUtils.js/
    childrenUtils.js
  classNameBuilders.js/
    classNameBuilders.js
  createPaginationItems/
    createPaginationItems.js/
      createPaginationItems.js
    index.js/
      index.js
    itemFactories.js/
      itemFactories.js
    paginationUtils.js/
      paginationUtils.js
    rangeFactories.js/
      rangeFactories.js
    suffixFactories.js/
      suffixFactories.js
  customPropTypes.js/
    customPropTypes.js
  doesNodeContainClick.js/
    doesNodeContainClick.js
  eventStack/
    index.js/
      index.js
    README.md/
      README.md
  factories.js/
    factories.js
  getComponentType.js/
    getComponentType.js
  getUnhandledProps.js/
    getUnhandledProps.js
  hooks/
    useAutoControlledValue.js/
      useAutoControlledValue.js
    useClassNamesOnNode.js/
      useClassNamesOnNode.js
    useEventCallback.js/
      useEventCallback.js
    useForceUpdate.js/
      useForceUpdate.js
    useIsomorphicLayoutEffect.js/
      useIsomorphicLayoutEffect.js
    useMergedRefs.js/
      useMergedRefs.js
    usePrevious.js/
      usePrevious.js
  htmlPropsUtils.js/
    htmlPropsUtils.js
  index.js/
    index.js
  isBrowser.js/
    isBrowser.js
  isRefObject.js/
    isRefObject.js
  leven.js/
    leven.js
  makeDebugger.js/
    makeDebugger.js
  ModernAutoControlledComponent.js/
    ModernAutoControlledComponent.js
  normalizeTransitionDuration.js/
    normalizeTransitionDuration.js
  numberToWord.js/
    numberToWord.js
  objectDiff.js/
    objectDiff.js
  SUI.js/
    SUI.js
modules/
  Accordion/
    Accordion.d.ts/
      Accordion.d.ts
    Accordion.js/
      Accordion.js
    AccordionAccordion.d.ts/
      AccordionAccordion.d.ts
    AccordionAccordion.js/
      AccordionAccordion.js
    AccordionContent.d.ts/
      AccordionContent.d.ts
    AccordionContent.js/
      AccordionContent.js
    AccordionPanel.d.ts/
      AccordionPanel.d.ts
    AccordionPanel.js/
      AccordionPanel.js
    AccordionTitle.d.ts/
      AccordionTitle.d.ts
    AccordionTitle.js/
      AccordionTitle.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Checkbox/
    Checkbox.d.ts/
      Checkbox.d.ts
    Checkbox.js/
      Checkbox.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Dimmer/
    Dimmer.d.ts/
      Dimmer.d.ts
    Dimmer.js/
      Dimmer.js
    DimmerDimmable.d.ts/
      DimmerDimmable.d.ts
    DimmerDimmable.js/
      DimmerDimmable.js
    DimmerInner.d.ts/
      DimmerInner.d.ts
    DimmerInner.js/
      DimmerInner.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Dropdown/
    Dropdown.d.ts/
      Dropdown.d.ts
    Dropdown.js/
      Dropdown.js
    DropdownDivider.d.ts/
      DropdownDivider.d.ts
    DropdownDivider.js/
      DropdownDivider.js
    DropdownHeader.d.ts/
      DropdownHeader.d.ts
    DropdownHeader.js/
      DropdownHeader.js
    DropdownItem.d.ts/
      DropdownItem.d.ts
    DropdownItem.js/
      DropdownItem.js
    DropdownMenu.d.ts/
      DropdownMenu.d.ts
    DropdownMenu.js/
      DropdownMenu.js
    DropdownSearchInput.d.ts/
      DropdownSearchInput.d.ts
    DropdownSearchInput.js/
      DropdownSearchInput.js
    DropdownText.d.ts/
      DropdownText.d.ts
    DropdownText.js/
      DropdownText.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    TODO.md/
      TODO.md
    utils/
      getMenuOptions.js/
        getMenuOptions.js
      getSelectedIndex.js/
        getSelectedIndex.js
  Embed/
    Embed.d.ts/
      Embed.d.ts
    Embed.js/
      Embed.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Modal/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Modal.d.ts/
      Modal.d.ts
    Modal.js/
      Modal.js
    ModalActions.d.ts/
      ModalActions.d.ts
    ModalActions.js/
      ModalActions.js
    ModalContent.d.ts/
      ModalContent.d.ts
    ModalContent.js/
      ModalContent.js
    ModalDescription.d.ts/
      ModalDescription.d.ts
    ModalDescription.js/
      ModalDescription.js
    ModalDimmer.d.ts/
      ModalDimmer.d.ts
    ModalDimmer.js/
      ModalDimmer.js
    ModalHeader.d.ts/
      ModalHeader.d.ts
    ModalHeader.js/
      ModalHeader.js
    utils/
      index.js/
        index.js
  Popup/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    lib/
      createReferenceProxy.js/
        createReferenceProxy.js
      positions.js/
        positions.js
    Popup.d.ts/
      Popup.d.ts
    Popup.js/
      Popup.js
    PopupContent.d.ts/
      PopupContent.d.ts
    PopupContent.js/
      PopupContent.js
    PopupHeader.d.ts/
      PopupHeader.d.ts
    PopupHeader.js/
      PopupHeader.js
  Progress/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Progress.d.ts/
      Progress.d.ts
    Progress.js/
      Progress.js
  Rating/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Rating.d.ts/
      Rating.d.ts
    Rating.js/
      Rating.js
    RatingIcon.d.ts/
      RatingIcon.d.ts
    RatingIcon.js/
      RatingIcon.js
  Search/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Search.d.ts/
      Search.d.ts
    Search.js/
      Search.js
    SearchCategory.d.ts/
      SearchCategory.d.ts
    SearchCategory.js/
      SearchCategory.js
    SearchCategoryLayout.d.ts/
      SearchCategoryLayout.d.ts
    SearchCategoryLayout.js/
      SearchCategoryLayout.js
    SearchResult.d.ts/
      SearchResult.d.ts
    SearchResult.js/
      SearchResult.js
    SearchResults.d.ts/
      SearchResults.d.ts
    SearchResults.js/
      SearchResults.js
  Sidebar/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Sidebar.d.ts/
      Sidebar.d.ts
    Sidebar.js/
      Sidebar.js
    SidebarPushable.d.ts/
      SidebarPushable.d.ts
    SidebarPushable.js/
      SidebarPushable.js
    SidebarPusher.d.ts/
      SidebarPusher.d.ts
    SidebarPusher.js/
      SidebarPusher.js
  Sticky/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Sticky.d.ts/
      Sticky.d.ts
    Sticky.js/
      Sticky.js
  Tab/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Tab.d.ts/
      Tab.d.ts
    Tab.js/
      Tab.js
    TabPane.d.ts/
      TabPane.d.ts
    TabPane.js/
      TabPane.js
  Transition/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Transition.d.ts/
      Transition.d.ts
    Transition.js/
      Transition.js
    TransitionGroup.d.ts/
      TransitionGroup.d.ts
    TransitionGroup.js/
      TransitionGroup.js
    utils/
      childMapping.js/
        childMapping.js
      computeStatuses.js/
        computeStatuses.js
      wrapChild.js/
        wrapChild.js
umd.js/
  umd.js
views/
  Advertisement/
    Advertisement.d.ts/
      Advertisement.d.ts
    Advertisement.js/
      Advertisement.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Card/
    Card.d.ts/
      Card.d.ts
    Card.js/
      Card.js
    CardContent.d.ts/
      CardContent.d.ts
    CardContent.js/
      CardContent.js
    CardDescription.d.ts/
      CardDescription.d.ts
    CardDescription.js/
      CardDescription.js
    CardGroup.d.ts/
      CardGroup.d.ts
    CardGroup.js/
      CardGroup.js
    CardHeader.d.ts/
      CardHeader.d.ts
    CardHeader.js/
      CardHeader.js
    CardMeta.d.ts/
      CardMeta.d.ts
    CardMeta.js/
      CardMeta.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Comment/
    Comment.d.ts/
      Comment.d.ts
    Comment.js/
      Comment.js
    CommentAction.d.ts/
      CommentAction.d.ts
    CommentAction.js/
      CommentAction.js
    CommentActions.d.ts/
      CommentActions.d.ts
    CommentActions.js/
      CommentActions.js
    CommentAuthor.d.ts/
      CommentAuthor.d.ts
    CommentAuthor.js/
      CommentAuthor.js
    CommentAvatar.d.ts/
      CommentAvatar.d.ts
    CommentAvatar.js/
      CommentAvatar.js
    CommentContent.d.ts/
      CommentContent.d.ts
    CommentContent.js/
      CommentContent.js
    CommentGroup.d.ts/
      CommentGroup.d.ts
    CommentGroup.js/
      CommentGroup.js
    CommentMetadata.d.ts/
      CommentMetadata.d.ts
    CommentMetadata.js/
      CommentMetadata.js
    CommentText.d.ts/
      CommentText.d.ts
    CommentText.js/
      CommentText.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Feed/
    Feed.d.ts/
      Feed.d.ts
    Feed.js/
      Feed.js
    FeedContent.d.ts/
      FeedContent.d.ts
    FeedContent.js/
      FeedContent.js
    FeedDate.d.ts/
      FeedDate.d.ts
    FeedDate.js/
      FeedDate.js
    FeedEvent.d.ts/
      FeedEvent.d.ts
    FeedEvent.js/
      FeedEvent.js
    FeedExtra.d.ts/
      FeedExtra.d.ts
    FeedExtra.js/
      FeedExtra.js
    FeedLabel.d.ts/
      FeedLabel.d.ts
    FeedLabel.js/
      FeedLabel.js
    FeedLike.d.ts/
      FeedLike.d.ts
    FeedLike.js/
      FeedLike.js
    FeedMeta.d.ts/
      FeedMeta.d.ts
    FeedMeta.js/
      FeedMeta.js
    FeedSummary.d.ts/
      FeedSummary.d.ts
    FeedSummary.js/
      FeedSummary.js
    FeedUser.d.ts/
      FeedUser.d.ts
    FeedUser.js/
      FeedUser.js
    index.d.ts/
      index.d.ts
    index.js/
      index.js
  Item/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Item.d.ts/
      Item.d.ts
    Item.js/
      Item.js
    ItemContent.d.ts/
      ItemContent.d.ts
    ItemContent.js/
      ItemContent.js
    ItemDescription.d.ts/
      ItemDescription.d.ts
    ItemDescription.js/
      ItemDescription.js
    ItemExtra.d.ts/
      ItemExtra.d.ts
    ItemExtra.js/
      ItemExtra.js
    ItemGroup.d.ts/
      ItemGroup.d.ts
    ItemGroup.js/
      ItemGroup.js
    ItemHeader.d.ts/
      ItemHeader.d.ts
    ItemHeader.js/
      ItemHeader.js
    ItemImage.d.ts/
      ItemImage.d.ts
    ItemImage.js/
      ItemImage.js
    ItemMeta.d.ts/
      ItemMeta.d.ts
    ItemMeta.js/
      ItemMeta.js
  Statistic/
    index.d.ts/
      index.d.ts
    index.js/
      index.js
    Statistic.d.ts/
      Statistic.d.ts
    Statistic.js/
      Statistic.js
    StatisticGroup.d.ts/
      StatisticGroup.d.ts
    StatisticGroup.js/
      StatisticGroup.js
    StatisticLabel.d.ts/
      StatisticLabel.d.ts
    StatisticLabel.js/
      StatisticLabel.js
    StatisticValue.d.ts/
      StatisticValue.d.ts
    StatisticValue.js/
      StatisticValue.js
```

# Files

## File: addons/Confirm/Confirm.d.ts/Confirm.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { ButtonProps } from '../../elements/Button'
import { StrictModalProps } from '../../modules/Modal'
import { ModalContentProps } from '../../modules/Modal/ModalContent'
import { ModalHeaderProps } from '../../modules/Modal/ModalHeader'
export interface ConfirmProps extends StrictConfirmProps {
  [key: string]: any
}
export interface StrictConfirmProps extends StrictModalProps {
  cancelButton?: SemanticShorthandItem<ButtonProps>
  confirmButton?: SemanticShorthandItem<ButtonProps>
  content?: SemanticShorthandItem<ModalContentProps>
  header?: SemanticShorthandItem<ModalHeaderProps>
  onCancel?: (event: React.MouseEvent<HTMLAnchorElement>, data: ConfirmProps) => void
  onConfirm?: (event: React.MouseEvent<HTMLAnchorElement>, data: ConfirmProps) => void
  open?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
}
declare const Confirm: ForwardRefComponent<ConfirmProps, HTMLDivElement>
export default Confirm
````

## File: addons/Confirm/Confirm.js/Confirm.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { customPropTypes, getUnhandledProps } from '../../lib'
import Button from '../../elements/Button'
import Modal from '../../modules/Modal'
const Confirm = React.forwardRef(function (props, ref) {
  const {
    cancelButton = 'Cancel',
    confirmButton = 'OK',
    content = 'Are you sure?',
    header,
    open,
    size = 'small',
  } = props
  const rest = getUnhandledProps(Confirm, props)
  const handleCancel = (e) => {
    _.invoke(props, 'onCancel', e, props)
  }
  const handleCancelOverrides = (predefinedProps) => ({
    onClick: (e, buttonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      handleCancel(e)
    },
  })
  const handleConfirmOverrides = (predefinedProps) => ({
    onClick: (e, buttonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps)
      _.invoke(props, 'onConfirm', e, props)
    },
  })
  const openProp = {}
  if (_.has(props, 'open')) {
    openProp.open = open
  }
  return (
    <Modal {...rest} {...openProp} size={size} onClose={handleCancel} ref={ref}>
      {Modal.Header.create(header, { autoGenerateKey: false })}
      {Modal.Content.create(content, { autoGenerateKey: false })}
      <Modal.Actions>
        {Button.create(cancelButton, {
          autoGenerateKey: false,
          overrideProps: handleCancelOverrides,
        })}
        {Button.create(confirmButton, {
          autoGenerateKey: false,
          defaultProps: { primary: true },
          overrideProps: handleConfirmOverrides,
        })}
      </Modal.Actions>
    </Modal>
  )
})
Confirm.displayName = 'Confirm'
Confirm.propTypes = {
  cancelButton: customPropTypes.itemShorthand,
  confirmButton: customPropTypes.itemShorthand,
  content: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  open: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
}
export default Confirm
````

## File: addons/Confirm/index.d.ts/index.d.ts
````typescript
export { default, ConfirmProps, StrictConfirmProps } from './Confirm'
````

## File: addons/Confirm/index.js/index.js
````javascript
export default from './Confirm'
````

## File: addons/Pagination/index.d.ts/index.d.ts
````typescript
export { default, PaginationProps, StrictPaginationProps } from './Pagination'
````

## File: addons/Pagination/index.js/index.js
````javascript
export default from './Pagination'
````

## File: addons/Pagination/Pagination.d.ts/Pagination.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import PaginationItem, { PaginationItemProps } from './PaginationItem'
export interface PaginationProps extends StrictPaginationProps {
  [key: string]: any
}
export interface StrictPaginationProps {
  'aria-label'?: string
  defaultActivePage?: number | string
  activePage?: number | string
  boundaryRange?: number | string
  disabled?: boolean
  ellipsisItem?: SemanticShorthandItem<PaginationItemProps>
  firstItem?: SemanticShorthandItem<PaginationItemProps>
  lastItem?: SemanticShorthandItem<PaginationItemProps>
  nextItem?: SemanticShorthandItem<PaginationItemProps>
  pageItem?: SemanticShorthandItem<PaginationItemProps>
  prevItem?: SemanticShorthandItem<PaginationItemProps>
  onPageChange?: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) => void
  siblingRange?: number | string
  totalPages: number | string
}
declare const Pagination: ForwardRefComponent<PaginationProps, HTMLDivElement> & {
  Item: typeof PaginationItem
}
export default Pagination
````

## File: addons/Pagination/Pagination.js/Pagination.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  createPaginationItems,
  customPropTypes,
  getUnhandledProps,
  useAutoControlledValue,
} from '../../lib'
import Menu from '../../collections/Menu'
import PaginationItem from './PaginationItem'
const Pagination = React.forwardRef(function (props, ref) {
  const {
    'aria-label': ariaLabel = 'Pagination Navigation',
    boundaryRange = 1,
    disabled,
    ellipsisItem = '...',
    firstItem = {
      'aria-label': 'First item',
      content: '«',
    },
    lastItem = {
      'aria-label': 'Last item',
      content: '»',
    },
    nextItem = {
      'aria-label': 'Next item',
      content: '⟩',
    },
    pageItem = {},
    prevItem = {
      'aria-label': 'Previous item',
      content: '⟨',
    },
    siblingRange = 1,
    totalPages,
  } = props
  const [activePage, setActivePage] = useAutoControlledValue({
    state: props.activePage,
    defaultState: props.defaultActivePage,
    initialState: 1,
  })
  const handleItemClick = (e, { value: nextActivePage }) => {
    const prevActivePage = activePage
    if (+prevActivePage === +nextActivePage) {
      return
    }
    setActivePage(nextActivePage)
    _.invoke(props, 'onPageChange', e, { ...props, activePage: nextActivePage })
  }
  const handleItemOverrides = (active, type, value) => (predefinedProps) => ({
    active,
    type,
    key: `${type}-${value}`,
    onClick: (e, itemProps) => {
      _.invoke(predefinedProps, 'onClick', e, itemProps)
      if (itemProps.type !== 'ellipsisItem') {
        handleItemClick(e, itemProps)
      }
    },
  })
  const items = createPaginationItems({
    activePage,
    boundaryRange,
    hideEllipsis: _.isNil(ellipsisItem),
    siblingRange,
    totalPages,
  })
  const rest = getUnhandledProps(Pagination, props)
  const paginationItemTypes = {
    firstItem,
    lastItem,
    ellipsisItem,
    nextItem,
    pageItem,
    prevItem,
  }
  return (
    <Menu {...rest} aria-label={ariaLabel} pagination role='navigation' ref={ref}>
      {_.map(items, ({ active, type, value }) =>
        PaginationItem.create(paginationItemTypes[type], {
          defaultProps: {
            content: value,
            disabled,
            value,
          },
          overrideProps: handleItemOverrides(active, type, value),
        }),
      )}
    </Menu>
  )
})
Pagination.displayName = 'Pagination'
Pagination.propTypes = {
  'aria-label': PropTypes.string,
  defaultActivePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  boundaryRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  ellipsisItem: customPropTypes.itemShorthand,
  firstItem: customPropTypes.itemShorthand,
  lastItem: customPropTypes.itemShorthand,
  nextItem: customPropTypes.itemShorthand,
  pageItem: customPropTypes.itemShorthand,
  prevItem: customPropTypes.itemShorthand,
  onPageChange: PropTypes.func,
  siblingRange: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalPages: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}
Pagination.Item = PaginationItem
export default Pagination
````

## File: addons/Pagination/PaginationItem.d.ts/PaginationItem.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent } from '../../generic'
export interface PaginationItemProps extends StrictPaginationItemProps {
  [key: string]: any
}
export interface StrictPaginationItemProps {
  active?: boolean
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationItemProps) => void
  onKeyDown?: (event: React.MouseEvent<HTMLAnchorElement>, data: PaginationItemProps) => void
  type?: 'ellipsisItem' | 'firstItem' | 'prevItem' | 'pageItem' | 'nextItem' | 'lastItem'
}
declare const PaginationItem: ForwardRefComponent<PaginationItemProps, HTMLDivElement>
export default PaginationItem
````

## File: addons/Pagination/PaginationItem.js/PaginationItem.js
````javascript
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { createShorthandFactory } from '../../lib'
import MenuItem from '../../collections/Menu/MenuItem'
const PaginationItem = React.forwardRef(function (props, ref) {
  const { active, type } = props
  const disabled = props.disabled || type === 'ellipsisItem'
  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, props)
  }
  const handleKeyDown = (e) => {
    _.invoke(props, 'onKeyDown', e, props)
    if (keyboardKey.getCode(e) === keyboardKey.Enter) {
      _.invoke(props, 'onClick', e, props)
    }
  }
  return MenuItem.create(props, {
    defaultProps: {
      active,
      'aria-current': active,
      'aria-disabled': disabled,
      disabled,
      tabIndex: disabled ? -1 : 0,
    },
    overrideProps: () => ({
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      ref,
    }),
  })
})
PaginationItem.displayName = 'PaginationItem'
PaginationItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  type: PropTypes.oneOf([
    'ellipsisItem',
    'firstItem',
    'prevItem',
    'pageItem',
    'nextItem',
    'lastItem',
  ]),
}
PaginationItem.create = createShorthandFactory(PaginationItem, (content) => ({ content }))
export default PaginationItem
````

## File: addons/Portal/index.d.ts/index.d.ts
````typescript
export { default, PortalProps, StrictPortalProps } from './Portal'
````

## File: addons/Portal/index.js/index.js
````javascript
export default from './Portal'
````

## File: addons/Portal/Portal.d.ts/Portal.d.ts
````typescript
import * as React from 'react'
import PortalInner from './PortalInner'
export interface PortalProps extends StrictPortalProps {
  [key: string]: any
}
export interface StrictPortalProps {
  children?: React.ReactNode
  closeOnDocumentClick?: boolean
  closeOnEscape?: boolean
  closeOnPortalMouseLeave?: boolean
  closeOnTriggerBlur?: boolean
  closeOnTriggerClick?: boolean
  closeOnTriggerMouseLeave?: boolean
  defaultOpen?: boolean
  eventPool?: string
  hideOnScroll?: boolean
  mountNode?: any
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  onClose?: (event: React.MouseEvent<HTMLElement>, data: PortalProps) => void
  onMount?: (nothing: null, data: PortalProps) => void
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: PortalProps) => void
  onUnmount?: (nothing: null, data: PortalProps) => void
  open?: boolean
  openOnTriggerClick?: boolean
  openOnTriggerFocus?: boolean
  openOnTriggerMouseEnter?: boolean
  trigger?: React.ReactNode
  triggerRef?: React.Ref<any>
}
declare const Portal: React.FC<PortalProps> & {
  Inner: typeof PortalInner
}
export default Portal
````

## File: addons/Portal/Portal.js/Portal.js
````javascript
import EventStack from '@semantic-ui-react/event-stack'
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  doesNodeContainClick,
  makeDebugger,
  useAutoControlledValue,
  useEventCallback,
} from '../../lib'
import useTrigger from './utils/useTrigger'
import PortalInner from './PortalInner'
const debug = makeDebugger('portal')
function Portal(props) {
  const {
    children,
    closeOnDocumentClick = true,
    closeOnEscape = true,
    closeOnPortalMouseLeave,
    closeOnTriggerBlur,
    closeOnTriggerClick,
    closeOnTriggerMouseLeave,
    eventPool = 'default',
    mountNode,
    mouseEnterDelay,
    mouseLeaveDelay,
    openOnTriggerClick = true,
    openOnTriggerFocus,
    openOnTriggerMouseEnter,
    hideOnScroll = false,
  } = props
  const [open, setOpen] = useAutoControlledValue({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  })
  const contentRef = React.useRef()
  const [triggerRef, trigger] = useTrigger(props.trigger, props.triggerRef)
  const mouseEnterTimer = React.useRef()
  const mouseLeaveTimer = React.useRef()
  const latestDocumentMouseDownEvent = React.useRef()
  const openPortal = (e) => {
    debug('open()')
    setOpen(true)
    _.invoke(props, 'onOpen', e, { ...props, open: true })
  }
  const openPortalWithTimeout = (e, delay) => {
    debug('openWithTimeout()', delay)
    const eventClone = { ...e }
    return setTimeout(() => openPortal(eventClone), delay || 0)
  }
  const closePortal = useEventCallback((e) => {
    debug('close()')
    setOpen(false)
    _.invoke(props, 'onClose', e, { ...props, open: false })
  })
  const closePortalWithTimeout = (e, delay) => {
    debug('closeWithTimeout()', delay)
    const eventClone = { ...e }
    return setTimeout(() => closePortal(eventClone), delay || 0)
  }
  React.useEffect(() => {
    clearTimeout(mouseEnterTimer.current)
    clearTimeout(mouseLeaveTimer.current)
  }, [])
  const handleDocumentMouseDown = (e) => {
    latestDocumentMouseDownEvent.current = e
  }
  const handleDocumentClick = (e) => {
    const currentMouseDownEvent = latestDocumentMouseDownEvent.current
    latestDocumentMouseDownEvent.current = null
    const isInsideTrigger = doesNodeContainClick(triggerRef.current, e)
    const isOriginatedFromPortal =
      currentMouseDownEvent && doesNodeContainClick(contentRef.current, currentMouseDownEvent)
    const isInsidePortal = doesNodeContainClick(contentRef.current, e)
    if (
      !contentRef.current?.contains ||
      isInsideTrigger ||
      isOriginatedFromPortal ||
      isInsidePortal
    ) {
      return
    }
    if (closeOnDocumentClick) {
      debug('handleDocumentClick()')
      closePortal(e)
    }
  }
  const handleEscape = (e) => {
    if (!closeOnEscape) {
      return
    }
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) {
      return
    }
    debug('handleEscape()')
    closePortal(e)
  }
  React.useEffect(() => {
    if (!hideOnScroll) {
      return
    }
    const handleScroll = (e) => {
      debug('handleHideOnScroll()')
      if (_.isElement(e.target) && contentRef.current.contains(e.target)) {
        return
      }
      closePortal(e)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [closePortal, hideOnScroll])
  const handlePortalMouseLeave = (e) => {
    if (!closeOnPortalMouseLeave) {
      return
    }
    if (e.target !== contentRef.current) {
      return
    }
    debug('handlePortalMouseLeave()')
    mouseLeaveTimer.current = closePortalWithTimeout(e, mouseLeaveDelay)
  }
  const handlePortalMouseEnter = () => {
    if (!closeOnPortalMouseLeave) {
      return
    }
    debug('handlePortalMouseEnter()')
    clearTimeout(mouseLeaveTimer.current)
  }
  const handleTriggerBlur = (e, ...rest) => {
    _.invoke(trigger, 'props.onBlur', e, ...rest)
    const target = e.relatedTarget || document.activeElement
    const didFocusPortal = _.invoke(contentRef.current, 'contains', target)
    if (!closeOnTriggerBlur || didFocusPortal) {
      return
    }
    debug('handleTriggerBlur()')
    closePortal(e)
  }
  const handleTriggerClick = (e, ...rest) => {
    _.invoke(trigger, 'props.onClick', e, ...rest)
    if (open && closeOnTriggerClick) {
      debug('handleTriggerClick() - close')
      closePortal(e)
    } else if (!open && openOnTriggerClick) {
      debug('handleTriggerClick() - open')
      openPortal(e)
    }
  }
  const handleTriggerFocus = (e, ...rest) => {
    _.invoke(trigger, 'props.onFocus', e, ...rest)
    if (!openOnTriggerFocus) {
      return
    }
    debug('handleTriggerFocus()')
    openPortal(e)
  }
  const handleTriggerMouseLeave = (e, ...rest) => {
    clearTimeout(mouseEnterTimer.current)
    _.invoke(trigger, 'props.onMouseLeave', e, ...rest)
    if (!closeOnTriggerMouseLeave) {
      return
    }
    debug('handleTriggerMouseLeave()')
    mouseLeaveTimer.current = closePortalWithTimeout(e, mouseLeaveDelay)
  }
  const handleTriggerMouseEnter = (e, ...rest) => {
    clearTimeout(mouseLeaveTimer.current)
    _.invoke(trigger, 'props.onMouseEnter', e, ...rest)
    if (!openOnTriggerMouseEnter) {
      return
    }
    debug('handleTriggerMouseEnter()')
    mouseEnterTimer.current = openPortalWithTimeout(e, mouseEnterDelay)
  }
  return (
    <>
      {open && (
        <>
          <PortalInner
            mountNode={mountNode}
            onMount={() => _.invoke(props, 'onMount', null, props)}
            onUnmount={() => _.invoke(props, 'onUnmount', null, props)}
            ref={contentRef}
          >
            {children}
          </PortalInner>
          <EventStack
            name='mouseleave'
            on={handlePortalMouseLeave}
            pool={eventPool}
            target={contentRef}
          />
          <EventStack
            name='mouseenter'
            on={handlePortalMouseEnter}
            pool={eventPool}
            target={contentRef}
          />
          <EventStack name='mousedown' on={handleDocumentMouseDown} pool={eventPool} />
          <EventStack name='click' on={handleDocumentClick} pool={eventPool} />
          <EventStack name='keydown' on={handleEscape} pool={eventPool} />
        </>
      )}
      {trigger &&
        React.cloneElement(trigger, {
          onBlur: handleTriggerBlur,
          onClick: handleTriggerClick,
          onFocus: handleTriggerFocus,
          onMouseLeave: handleTriggerMouseLeave,
          onMouseEnter: handleTriggerMouseEnter,
          ref: triggerRef,
        })}
    </>
  )
}
Portal.displayName = 'Portal'
Portal.propTypes = {
  children: PropTypes.node.isRequired,
  closeOnDocumentClick: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnPortalMouseLeave: PropTypes.bool,
  closeOnTriggerBlur: PropTypes.bool,
  closeOnTriggerClick: PropTypes.bool,
  closeOnTriggerMouseLeave: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  eventPool: PropTypes.string,
  hideOnScroll: PropTypes.bool,
  mountNode: PropTypes.any,
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  onClose: PropTypes.func,
  onMount: PropTypes.func,
  onOpen: PropTypes.func,
  onUnmount: PropTypes.func,
  open: PropTypes.bool,
  openOnTriggerClick: PropTypes.bool,
  openOnTriggerFocus: PropTypes.bool,
  openOnTriggerMouseEnter: PropTypes.bool,
  trigger: PropTypes.node,
  triggerRef: customPropTypes.ref,
}
Portal.Inner = PortalInner
export default Portal
````

## File: addons/Portal/PortalInner.d.ts/PortalInner.d.ts
````typescript
import * as React from 'react'
export interface PortalInnerProps extends StrictPortalInnerProps {
  [key: string]: any
}
export interface StrictPortalInnerProps {
  children: React.ReactNode
  mountNode?: any
  onMount?: (nothing: null, data: PortalInnerProps) => void
  onUnmount?: (nothing: null, data: PortalInnerProps) => void
}
declare const PortalInner: React.FC<PortalInnerProps>
export default PortalInner
````

## File: addons/Portal/PortalInner.js/PortalInner.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { isBrowser, makeDebugger, useEventCallback } from '../../lib'
import usePortalElement from './usePortalElement'
const debug = makeDebugger('PortalInner')
const PortalInner = React.forwardRef(function (props, ref) {
  const handleMount = useEventCallback(() => _.invoke(props, 'onMount', null, props))
  const handleUnmount = useEventCallback(() => _.invoke(props, 'onUnmount', null, props))
  const element = usePortalElement(props.children, ref)
  React.useEffect(() => {
    debug('componentDidMount()')
    handleMount()
    return () => {
      debug('componentWillUnmount()')
      handleUnmount()
    }
  }, [])
  if (!isBrowser()) {
    return null
  }
  return createPortal(element, props.mountNode || document.body)
})
PortalInner.displayName = 'PortalInner'
PortalInner.propTypes = {
  children: PropTypes.node.isRequired,
  mountNode: PropTypes.any,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
}
export default PortalInner
````

## File: addons/Portal/usePortalElement.js/usePortalElement.js
````javascript
import * as React from 'react'
import ReactIs from 'react-is'
import { useMergedRefs } from '../../lib'
export default function usePortalElement(node, userRef) {
  const ref = useMergedRefs(node.ref, userRef)
  if (React.isValidElement(node)) {
    if (ReactIs.isForwardRef(node)) {
      return React.cloneElement(node, { ref })
    }
    if (typeof node.type === 'string') {
      return React.cloneElement(node, { ref })
    }
  }
  return (
    <div data-suir-portal='true' ref={ref}>
      {node}
    </div>
  )
}
````

## File: addons/Portal/utils/useTrigger.js/useTrigger.js
````javascript
import * as React from 'react'
import { useMergedRefs } from '../../../lib'
import validateTrigger from './validateTrigger'
function useTrigger(trigger, triggerRef) {
  const ref = useMergedRefs(trigger?.ref, triggerRef)
  if (trigger) {
    if (process.env.NODE_ENV !== 'production') {
      validateTrigger(trigger)
    }
    return [ref, React.cloneElement(trigger, { ref })]
  }
  return [ref, null]
}
export default useTrigger
````

## File: addons/Portal/utils/validateTrigger.js/validateTrigger.js
````javascript
import * as React from 'react'
import * as ReactIs from 'react-is'
export default function validateTrigger(element) {
  React.Children.only(element)
  if (ReactIs.isFragment(element)) {
    throw new Error('An "React.Fragment" cannot be used as a `trigger`.')
  }
}
````

## File: addons/Radio/index.d.ts/index.d.ts
````typescript
export { default, RadioProps, StrictRadioProps } from './Radio'
````

## File: addons/Radio/index.js/index.js
````javascript
export default from './Radio'
````

## File: addons/Radio/Radio.d.ts/Radio.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
import { StrictCheckboxProps } from '../../modules/Checkbox'
export interface RadioProps extends StrictRadioProps {
  [key: string]: any
}
export interface StrictRadioProps extends StrictCheckboxProps {
  slider?: boolean
  toggle?: boolean
  type?: 'checkbox' | 'radio'
}
declare const Radio: ForwardRefComponent<RadioProps, HTMLInputElement>
export default Radio
````

## File: addons/Radio/Radio.js/Radio.js
````javascript
import * as React from 'react'
import { getUnhandledProps } from '../../lib'
import Checkbox from '../../modules/Checkbox'
const Radio = React.forwardRef(function (props, ref) {
  const { slider, toggle, type = 'radio' } = props
  const rest = getUnhandledProps(Radio, props)
  const radio = !(slider || toggle) || undefined
  return <Checkbox {...rest} type={type} radio={radio} slider={slider} toggle={toggle} ref={ref} />
})
Radio.displayName = 'Radio'
Radio.propTypes = {
  slider: Checkbox.propTypes.slider,
  toggle: Checkbox.propTypes.toggle,
  type: Checkbox.propTypes.type,
}
export default Radio
````

## File: addons/Select/index.d.ts/index.d.ts
````typescript
export { default, SelectProps, StrictSelectProps } from './Select'
````

## File: addons/Select/index.js/index.js
````javascript
export default from './Select'
````

## File: addons/Select/Select.d.ts/Select.d.ts
````typescript
import { StrictDropdownProps } from '../../modules/Dropdown'
import DropdownDivider from '../../modules/Dropdown/DropdownDivider'
import DropdownHeader from '../../modules/Dropdown/DropdownHeader'
import DropdownItem, { DropdownItemProps } from '../../modules/Dropdown/DropdownItem'
import DropdownMenu from '../../modules/Dropdown/DropdownMenu'
import { ForwardRefComponent } from '../../generic'
export interface SelectProps extends StrictSelectProps {
  [key: string]: any
}
export interface StrictSelectProps extends StrictDropdownProps {
  options: DropdownItemProps[]
}
declare const Select: ForwardRefComponent<SelectProps, HTMLDivElement> & {
  Divider: typeof DropdownDivider
  Header: typeof DropdownHeader
  Item: typeof DropdownItem
  Menu: typeof DropdownMenu
}
export default Select
````

## File: addons/Select/Select.js/Select.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import Dropdown from '../../modules/Dropdown'
const Select = React.forwardRef(function (props, ref) {
  return <Dropdown {...props} selection ref={ref} />
})
Select.displayName = 'Select'
Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(Dropdown.Item.propTypes)).isRequired,
}
Select.Divider = Dropdown.Divider
Select.Header = Dropdown.Header
Select.Item = Dropdown.Item
Select.Menu = Dropdown.Menu
export default Select
````

## File: addons/TextArea/index.d.ts/index.d.ts
````typescript
export { default, TextAreaProps, StrictTextAreaProps } from './TextArea'
````

## File: addons/TextArea/index.js/index.js
````javascript
export default from './TextArea'
````

## File: addons/TextArea/TextArea.d.ts/TextArea.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent } from '../../generic'
export interface TextAreaProps extends StrictTextAreaProps {
  [key: string]: any
}
export interface StrictTextAreaProps {
  as?: any
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, data: TextAreaProps) => void
  onInput?: (event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void
  rows?: number | string
  value?: number | string
}
declare const TextArea: ForwardRefComponent<TextAreaProps, HTMLTextAreaElement>
export default TextArea
````

## File: addons/TextArea/TextArea.js/TextArea.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps, useMergedRefs } from '../../lib'
const TextArea = React.forwardRef(function (props, ref) {
  const { rows = 3, value } = props
  const elementRef = useMergedRefs(ref, React.useRef())
  const handleChange = (e) => {
    const newValue = _.get(e, 'target.value')
    _.invoke(props, 'onChange', e, { ...props, value: newValue })
  }
  const handleInput = (e) => {
    const newValue = _.get(e, 'target.value')
    _.invoke(props, 'onInput', e, { ...props, value: newValue })
  }
  const rest = getUnhandledProps(TextArea, props)
  const ElementType = getComponentType(props, { defaultAs: 'textarea' })
  return (
    <ElementType
      {...rest}
      onChange={handleChange}
      onInput={handleInput}
      ref={elementRef}
      rows={rows}
      value={value}
    />
  )
})
TextArea.displayName = 'TextArea'
TextArea.propTypes = {
  as: PropTypes.elementType,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
export default TextArea
````

## File: addons/TransitionablePortal/index.d.ts/index.d.ts
````typescript
export {
  default,
  TransitionablePortalProps,
  StrictTransitionablePortalProps,
  TransitionablePortalState,
} from './TransitionablePortal'
````

## File: addons/TransitionablePortal/index.js/index.js
````javascript
export default from './TransitionablePortal'
````

## File: addons/TransitionablePortal/TransitionablePortal.d.ts/TransitionablePortal.d.ts
````typescript
import * as React from 'react'
import { TransitionEventData, TransitionProps } from '../../modules/Transition/Transition'
import { PortalProps } from '../Portal/Portal'
export interface TransitionablePortalProps extends StrictTransitionablePortalProps {
  [key: string]: any
}
export interface StrictTransitionablePortalProps {
  children: React.ReactNode
  onClose?: (nothing: null, data: PortalProps & TransitionablePortalState) => void
  onHide?: (nothing: null, data: TransitionEventData & TransitionablePortalState) => void
  onOpen?: (nothing: null, data: PortalProps & TransitionablePortalState) => void
  onStart?: (nothing: null, data: TransitionEventData & TransitionablePortalState) => void
  open?: boolean
  transition?: TransitionProps
}
export interface TransitionablePortalState {
  portalOpen: boolean
  transitionVisible: boolean
}
declare const TransitionablePortal: React.ComponentClass<TransitionablePortalProps>
export default TransitionablePortal
````

## File: addons/TransitionablePortal/TransitionablePortal.js/TransitionablePortal.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import Portal from '../Portal'
import Transition from '../../modules/Transition'
import { TRANSITION_STATUS_ENTERING } from '../../modules/Transition/utils/computeStatuses'
import { getUnhandledProps, makeDebugger, useForceUpdate } from '../../lib'
const debug = makeDebugger('transitionable_portal')
function usePortalState(props) {
  const portalOpen = React.useRef(false)
  const forceUpdate = useForceUpdate()
  const setPortalOpen = React.useCallback((value) => {
    portalOpen.current = value
    forceUpdate()
  }, [])
  React.useEffect(() => {
    if (!_.isUndefined(props.open)) {
      portalOpen.current = props.open
    }
  }, [props.open])
  if (_.isUndefined(props.open)) {
    if (portalOpen.current === -1) {
      return [false, setPortalOpen]
    }
    return [portalOpen.current, setPortalOpen]
  }
  return [props.open, setPortalOpen]
}
function TransitionablePortal(props) {
  const {
    children,
    transition = {
      animation: 'scale',
      duration: 400,
    },
  } = props
  const [portalOpen, setPortalOpen] = usePortalState(props)
  const [transitionVisible, setTransitionVisible] = React.useState(false)
  const open = portalOpen || transitionVisible
  const handlePortalClose = () => {
    debug('handlePortalClose()')
    setPortalOpen(-1)
  }
  const handlePortalOpen = () => {
    debug('handlePortalOpen()')
    setPortalOpen(true)
  }
  const handleTransitionHide = (nothing, data) => {
    debug('handleTransitionHide()')
    setTransitionVisible(false)
    _.invoke(props, 'onClose', null, { ...data, portalOpen: false, transitionVisible: false })
    _.invoke(props, 'onHide', null, { ...data, portalOpen, transitionVisible: false })
  }
  const handleTransitionStart = (nothing, data) => {
    debug('handleTransitionStart()')
    const { status } = data
    const nextTransitionVisible = status === TRANSITION_STATUS_ENTERING
    _.invoke(props, 'onStart', null, {
      ...data,
      portalOpen,
      transitionVisible: nextTransitionVisible,
    })
    if (!nextTransitionVisible) {
      return
    }
    setTransitionVisible(nextTransitionVisible)
    _.invoke(props, 'onOpen', null, {
      ...data,
      transitionVisible: nextTransitionVisible,
      portalOpen: true,
    })
  }
  const rest = getUnhandledProps(TransitionablePortal, props)
  return (
    <Portal {...rest} open={open} onOpen={handlePortalOpen} onClose={handlePortalClose}>
      <Transition
        {...transition}
        transitionOnMount
        onStart={handleTransitionStart}
        onHide={handleTransitionHide}
        visible={portalOpen}
      >
        {children}
      </Transition>
    </Portal>
  )
}
TransitionablePortal.displayName = 'TransitionablePortal'
TransitionablePortal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
  onOpen: PropTypes.func,
  onStart: PropTypes.func,
  open: PropTypes.bool,
  transition: PropTypes.object,
}
export default TransitionablePortal
````

## File: collections/Breadcrumb/Breadcrumb.d.ts/Breadcrumb.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { IconProps } from '../../elements/Icon'
import BreadcrumbDivider from './BreadcrumbDivider'
import BreadcrumbSection, { BreadcrumbSectionProps } from './BreadcrumbSection'
export interface BreadcrumbProps extends StrictBreadcrumbProps {
  [key: string]: any
}
export interface StrictBreadcrumbProps {
  as?: any
  children?: React.ReactNode
  className?: string
  divider?: SemanticShorthandContent
  icon?: SemanticShorthandItem<IconProps>
  sections?: SemanticShorthandCollection<BreadcrumbSectionProps>
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
}
declare const Breadcrumb: ForwardRefComponent<BreadcrumbProps, HTMLDivElement> & {
  Divider: typeof BreadcrumbDivider
  Section: typeof BreadcrumbSection
}
export default Breadcrumb
````

## File: collections/Breadcrumb/Breadcrumb.js/Breadcrumb.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getUnhandledProps, getComponentType, SUI } from '../../lib'
import BreadcrumbDivider from './BreadcrumbDivider'
import BreadcrumbSection from './BreadcrumbSection'
const Breadcrumb = React.forwardRef(function (props, ref) {
  const { children, className, divider, icon, sections, size } = props
  const classes = cx('ui', size, 'breadcrumb', className)
  const rest = getUnhandledProps(Breadcrumb, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const childElements = []
  _.each(sections, (section, index) => {
    const breadcrumbElement = BreadcrumbSection.create(section)
    childElements.push(breadcrumbElement)
    if (index !== sections.length - 1) {
      const key = `${breadcrumbElement.key}_divider` || JSON.stringify(section)
      childElements.push(BreadcrumbDivider.create({ content: divider, icon, key }))
    }
  })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childElements}
    </ElementType>
  )
})
Breadcrumb.displayName = 'Breadcrumb'
Breadcrumb.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  divider: customPropTypes.every([
    customPropTypes.disallow(['icon']),
    customPropTypes.contentShorthand,
  ]),
  icon: customPropTypes.every([
    customPropTypes.disallow(['divider']),
    customPropTypes.itemShorthand,
  ]),
  sections: customPropTypes.collectionShorthand,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
}
Breadcrumb.Divider = BreadcrumbDivider
Breadcrumb.Section = BreadcrumbSection
export default Breadcrumb
````

## File: collections/Breadcrumb/BreadcrumbDivider.d.ts/BreadcrumbDivider.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface BreadcrumbDividerProps extends StrictBreadcrumbDividerProps {
  [key: string]: any
}
export interface StrictBreadcrumbDividerProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  icon?: SemanticShorthandItem<IconProps>
}
declare const BreadcrumbDivider: ForwardRefComponent<BreadcrumbDividerProps, HTMLDivElement>
export default BreadcrumbDivider
````

## File: collections/Breadcrumb/BreadcrumbDivider.js/BreadcrumbDivider.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getUnhandledProps,
  getComponentType,
} from '../../lib'
import Icon from '../../elements/Icon'
const BreadcrumbDivider = React.forwardRef(function (props, ref) {
  const { children, className, content, icon } = props
  const classes = cx('divider', className)
  const rest = getUnhandledProps(BreadcrumbDivider, props)
  const ElementType = getComponentType(props)
  if (!_.isNil(icon)) {
    return Icon.create(icon, {
      defaultProps: { ...rest, className: classes },
      autoGenerateKey: false,
      ref,
    })
  }
  if (!_.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? '/' : children}
    </ElementType>
  )
})
BreadcrumbDivider.displayName = 'BreadcrumbDivider'
BreadcrumbDivider.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  icon: customPropTypes.itemShorthand,
}
BreadcrumbDivider.create = createShorthandFactory(BreadcrumbDivider, (icon) => ({ icon }))
export default BreadcrumbDivider
````

## File: collections/Breadcrumb/BreadcrumbSection.d.ts/BreadcrumbSection.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface BreadcrumbSectionProps extends StrictBreadcrumbSectionProps {
  [key: string]: any
}
export interface StrictBreadcrumbSectionProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  href?: string
  link?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: BreadcrumbSectionProps) => void
}
declare const BreadcrumbSection: ForwardRefComponent<BreadcrumbSectionProps, HTMLDivElement>
export default BreadcrumbSection
````

## File: collections/Breadcrumb/BreadcrumbSection.js/BreadcrumbSection.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getUnhandledProps,
  getComponentType,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
const BreadcrumbSection = React.forwardRef(function (props, ref) {
  const { active, children, className, content, href, link, onClick } = props
  const classes = cx(getKeyOnly(active, 'active'), 'section', className)
  const rest = getUnhandledProps(BreadcrumbSection, props)
  const ElementType = getComponentType(props, {
    getDefault: () => {
      if (link || onClick) return 'a'
    },
  })
  const handleClick = useEventCallback((e) => _.invoke(props, 'onClick', e, props))
  return (
    <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
BreadcrumbSection.displayName = 'BreadcrumbSection'
BreadcrumbSection.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  href: customPropTypes.every([customPropTypes.disallow(['link']), PropTypes.string]),
  link: customPropTypes.every([customPropTypes.disallow(['href']), PropTypes.bool]),
  onClick: PropTypes.func,
}
BreadcrumbSection.create = createShorthandFactory(BreadcrumbSection, (content) => ({
  content,
  link: true,
}))
export default BreadcrumbSection
````

## File: collections/Breadcrumb/index.d.ts/index.d.ts
````typescript
export { default, BreadcrumbProps, StrictBreadcrumbProps } from './Breadcrumb'
````

## File: collections/Breadcrumb/index.js/index.js
````javascript
export default from './Breadcrumb'
````

## File: collections/Form/Form.d.ts/Form.d.ts
````typescript
import * as React from 'react'
import FormField from './FormField'
import FormButton from './FormButton'
import FormCheckbox from './FormCheckbox'
import FormDropdown from './FormDropdown'
import FormGroup from './FormGroup'
import FormInput from './FormInput'
import FormRadio from './FormRadio'
import FormSelect from './FormSelect'
import FormTextArea from './FormTextArea'
import { ForwardRefComponent } from '../../generic'
export interface FormProps extends StrictFormProps {
  [key: string]: any
}
export interface StrictFormProps {
  as?: any
  action?: string
  children?: React.ReactNode
  className?: string
  error?: boolean
  inverted?: boolean
  loading?: boolean
  onSubmit?: (event: React.FormEvent<HTMLFormElement>, data: FormProps) => void
  reply?: boolean
  size?: string
  success?: boolean
  unstackable?: boolean
  warning?: boolean
  widths?: 'equal'
}
declare const Form: ForwardRefComponent<FormProps, HTMLFormElement> & {
  Field: typeof FormField
  Button: typeof FormButton
  Checkbox: typeof FormCheckbox
  Dropdown: typeof FormDropdown
  Group: typeof FormGroup
  Input: typeof FormInput
  Radio: typeof FormRadio
  Select: typeof FormSelect
  TextArea: typeof FormTextArea
}
export default Form
````

## File: collections/Form/Form.js/Form.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps, SUI, getKeyOnly, getWidthProp } from '../../lib'
import FormButton from './FormButton'
import FormCheckbox from './FormCheckbox'
import FormDropdown from './FormDropdown'
import FormField from './FormField'
import FormGroup from './FormGroup'
import FormInput from './FormInput'
import FormRadio from './FormRadio'
import FormSelect from './FormSelect'
import FormTextArea from './FormTextArea'
const Form = React.forwardRef(function (props, ref) {
  const {
    action,
    children,
    className,
    error,
    inverted,
    loading,
    reply,
    size,
    success,
    unstackable,
    warning,
    widths,
  } = props
  const handleSubmit = (e, ...args) => {
    if (typeof action !== 'string') _.invoke(e, 'preventDefault')
    _.invoke(props, 'onSubmit', e, props, ...args)
  }
  const classes = cx(
    'ui',
    size,
    getKeyOnly(error, 'error'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(loading, 'loading'),
    getKeyOnly(reply, 'reply'),
    getKeyOnly(success, 'success'),
    getKeyOnly(unstackable, 'unstackable'),
    getKeyOnly(warning, 'warning'),
    getWidthProp(widths, null, true),
    'form',
    className,
  )
  const rest = getUnhandledProps(Form, props)
  const ElementType = getComponentType(props, { defaultAs: 'form' })
  return (
    <ElementType {...rest} action={action} className={classes} onSubmit={handleSubmit} ref={ref}>
      {children}
    </ElementType>
  )
})
Form.displayName = 'Form'
Form.propTypes = {
  as: PropTypes.elementType,
  action: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.bool,
  inverted: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  reply: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  success: PropTypes.bool,
  unstackable: PropTypes.bool,
  warning: PropTypes.bool,
  widths: PropTypes.oneOf(['equal']),
}
Form.Field = FormField
Form.Button = FormButton
Form.Checkbox = FormCheckbox
Form.Dropdown = FormDropdown
Form.Group = FormGroup
Form.Input = FormInput
Form.Radio = FormRadio
Form.Select = FormSelect
Form.TextArea = FormTextArea
export default Form
````

## File: collections/Form/FormButton.d.ts/FormButton.d.ts
````typescript
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { StrictButtonProps } from '../../elements/Button'
import { LabelProps } from '../../elements/Label'
import { StrictFormFieldProps } from './FormField'
export interface FormButtonProps extends StrictFormButtonProps {
  [key: string]: any
}
export interface StrictFormButtonProps
  extends Omit<StrictFormFieldProps, 'label'>,
    Omit<StrictButtonProps, 'type'> {
  as?: any
  control?: any
  label?: SemanticShorthandItem<LabelProps>
}
declare const FormButton: ForwardRefComponent<FormButtonProps, HTMLButtonElement>
export default FormButton
````

## File: collections/Form/FormButton.js/FormButton.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import Button from '../../elements/Button'
import FormField from './FormField'
const FormButton = React.forwardRef((props, ref) => {
  const { control = Button } = props
  const rest = getUnhandledProps(FormButton, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} ref={ref} />
})
FormButton.displayName = 'FormButton'
FormButton.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
}
export default FormButton
````

## File: collections/Form/FormCheckbox.d.ts/FormCheckbox.d.ts
````typescript
import { StrictCheckboxProps } from '../../modules/Checkbox'
import { ForwardRefComponent } from '../../generic'
import { StrictFormFieldProps } from './FormField'
export interface FormCheckboxProps extends StrictFormCheckboxProps {
  [key: string]: any
}
export interface StrictFormCheckboxProps extends StrictFormFieldProps, StrictCheckboxProps {
  as?: any
  control?: any
  type?: 'checkbox' | 'radio'
}
declare const FormCheckbox: ForwardRefComponent<FormCheckboxProps, HTMLInputElement>
export default FormCheckbox
````

## File: collections/Form/FormCheckbox.js/FormCheckbox.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import Checkbox from '../../modules/Checkbox'
import FormField from './FormField'
const FormCheckbox = React.forwardRef((props, ref) => {
  const { control = Checkbox } = props
  const rest = getUnhandledProps(FormCheckbox, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} ref={ref} />
})
FormCheckbox.displayName = 'FormCheckbox'
FormCheckbox.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
}
export default FormCheckbox
````

## File: collections/Form/FormDropdown.d.ts/FormDropdown.d.ts
````typescript
import { StrictDropdownProps } from '../../modules/Dropdown'
import { ForwardRefComponent } from '../../generic'
import { StrictFormFieldProps } from './FormField'
export interface FormDropdownProps extends StrictFormDropdownProps {
  [key: string]: any
}
export interface StrictFormDropdownProps extends StrictFormFieldProps, StrictDropdownProps {
  as?: any
  control?: any
  error?: any
}
declare const FormDropdown: ForwardRefComponent<FormDropdownProps, HTMLDivElement>
export default FormDropdown
````

## File: collections/Form/FormDropdown.js/FormDropdown.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import Dropdown from '../../modules/Dropdown'
import FormField from './FormField'
const FormDropdown = React.forwardRef(function (props, ref) {
  const { control = Dropdown } = props
  const rest = getUnhandledProps(FormDropdown, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} ref={ref} />
})
FormDropdown.displayName = 'FormDropdown'
FormDropdown.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
}
export default FormDropdown
````

## File: collections/Form/FormField.d.ts/FormField.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  HtmlLabelProps,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticWIDTHS,
} from '../../generic'
import { LabelProps } from '../../elements/Label'
export interface FormFieldProps extends StrictFormFieldProps {
  [key: string]: any
}
export interface StrictFormFieldProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  control?: any
  disabled?: boolean
  error?: boolean | SemanticShorthandItem<LabelProps>
  id?: number | string
  inline?: boolean
  label?: SemanticShorthandItem<HtmlLabelProps>
  required?: any
  type?: string
  width?: SemanticWIDTHS
}
declare const FormField: ForwardRefComponent<FormFieldProps, HTMLElement>
export default FormField
````

## File: collections/Form/FormField.js/FormField.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { createElement } from 'react'
import {
  childrenUtils,
  createHTMLLabel,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getWidthProp,
} from '../../lib'
import Label from '../../elements/Label'
import Checkbox from '../../modules/Checkbox'
import Radio from '../../addons/Radio'
const FormField = React.forwardRef(function (props, ref) {
  const {
    children,
    className,
    content,
    control,
    disabled,
    error,
    inline,
    label,
    required,
    type,
    width,
    id,
  } = props
  const classes = cx(
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(error, 'error'),
    getKeyOnly(inline, 'inline'),
    getKeyOnly(required, 'required'),
    getWidthProp(width, 'wide'),
    'field',
    className,
  )
  const rest = getUnhandledProps(FormField, props)
  const ElementType = getComponentType(props)
  const errorPointing = _.get(error, 'pointing', 'above')
  const errorLabel = Label.create(error, {
    autoGenerateKey: false,
    defaultProps: {
      prompt: true,
      pointing: errorPointing,
      id: id ? `${id}-error-message` : undefined,
      role: 'alert',
      'aria-atomic': true,
    },
  })
  const errorLabelBefore = (errorPointing === 'below' || errorPointing === 'right') && errorLabel
  const errorLabelAfter = (errorPointing === 'above' || errorPointing === 'left') && errorLabel
  if (_.isNil(control)) {
    if (_.isNil(label)) {
      return (
        <ElementType {...rest} className={classes} id={id} ref={ref}>
          {childrenUtils.isNil(children) ? content : children}
        </ElementType>
      )
    }
    return (
      <ElementType {...rest} className={classes} id={id} ref={ref}>
        {errorLabelBefore}
        {createHTMLLabel(label, { autoGenerateKey: false })}
        {errorLabelAfter}
      </ElementType>
    )
  }
  const ariaDescribedBy = id && error ? `${id}-error-message` : null
  const ariaAttrs = {
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': error ? true : undefined,
  }
  const controlProps = { ...rest, content, children, disabled, required, type, id, ref }
  if (control === 'input' && (type === 'checkbox' || type === 'radio')) {
    return (
      <ElementType className={classes}>
        <label>
          {errorLabelBefore}
          {createElement(control, { ...ariaAttrs, ...controlProps })} {label}
          {errorLabelAfter}
        </label>
      </ElementType>
    )
  }
  if (control === Checkbox || control === Radio) {
    return (
      <ElementType className={classes}>
        {errorLabelBefore}
        {createElement(control, { ...ariaAttrs, ...controlProps, label })}
        {errorLabelAfter}
      </ElementType>
    )
  }
  return (
    <ElementType className={classes}>
      {createHTMLLabel(label, {
        defaultProps: { htmlFor: id },
        autoGenerateKey: false,
      })}
      {errorLabelBefore}
      {createElement(control, { ...ariaAttrs, ...controlProps })}
      {errorLabelAfter}
    </ElementType>
  )
})
FormField.displayName = 'FormField'
FormField.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  control: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.oneOf(['button', 'input', 'select', 'textarea']),
  ]),
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  id: PropTypes.string,
  inline: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  required: PropTypes.bool,
  type: customPropTypes.every([
    customPropTypes.demand(['control']),
  ]),
  width: PropTypes.oneOf(SUI.WIDTHS),
}
export default FormField
````

## File: collections/Form/FormGroup.d.ts/FormGroup.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticWIDTHS } from '../../generic'
export interface FormGroupProps extends StrictFormGroupProps {
  [key: string]: any
}
export interface StrictFormGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  error?: boolean
  grouped?: boolean
  inline?: boolean
  unstackable?: boolean
  widths?: SemanticWIDTHS | 'equal'
}
declare const FormGroup: ForwardRefComponent<FormGroupProps, HTMLInputElement>
export default FormGroup
````

## File: collections/Form/FormGroup.js/FormGroup.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getWidthProp,
} from '../../lib'
const FormGroup = React.forwardRef((props, ref) => {
  const { children, className, disabled, error, grouped, inline, unstackable, widths } = props
  const classes = cx(
    getKeyOnly(error, 'error'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(grouped, 'grouped'),
    getKeyOnly(inline, 'inline'),
    getKeyOnly(unstackable, 'unstackable'),
    getWidthProp(widths, null, true),
    'fields',
    className,
  )
  const rest = getUnhandledProps(FormGroup, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {children}
    </ElementType>
  )
})
FormGroup.displayName = 'FormGroup'
FormGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  grouped: customPropTypes.every([customPropTypes.disallow(['inline']), PropTypes.bool]),
  inline: customPropTypes.every([customPropTypes.disallow(['grouped']), PropTypes.bool]),
  unstackable: PropTypes.bool,
  widths: PropTypes.oneOf([...SUI.WIDTHS, 'equal']),
}
export default FormGroup
````

## File: collections/Form/FormInput.d.ts/FormInput.d.ts
````typescript
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { LabelProps } from '../../elements/Label'
import { StrictInputProps } from '../../elements/Input'
import { StrictFormFieldProps } from './FormField'
export interface FormInputProps extends StrictFormInputProps {
  [key: string]: any
}
export interface StrictFormInputProps
  extends Omit<StrictFormFieldProps, 'label'>,
    StrictInputProps {
  as?: any
  control?: any
  error?: any
  label?: SemanticShorthandItem<LabelProps>
}
declare const FormInput: ForwardRefComponent<FormInputProps, HTMLInputElement>
export default FormInput
````

## File: collections/Form/FormInput.js/FormInput.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import Input from '../../elements/Input'
import FormField from './FormField'
const FormInput = React.forwardRef(function (props, ref) {
  const { control = Input } = props
  const rest = getUnhandledProps(FormInput, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} ref={ref} />
})
FormInput.displayName = 'FormInput'
FormInput.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
}
export default FormInput
````

## File: collections/Form/FormRadio.d.ts/FormRadio.d.ts
````typescript
import { StrictRadioProps } from '../../addons/Radio'
import { ForwardRefComponent } from '../../generic'
import { StrictFormFieldProps } from './FormField'
export interface FormRadioProps extends StrictFormRadioProps {
  [key: string]: any
}
export interface StrictFormRadioProps extends StrictFormFieldProps, StrictRadioProps {
  as?: any
  control?: any
  type?: 'checkbox' | 'radio'
}
declare const FormRadio: ForwardRefComponent<FormRadioProps, HTMLInputElement>
export default FormRadio
````

## File: collections/Form/FormRadio.js/FormRadio.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import Radio from '../../addons/Radio'
import FormField from './FormField'
const FormRadio = React.forwardRef(function (props, ref) {
  const { control = Radio } = props
  const rest = getUnhandledProps(FormRadio, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} ref={ref} />
})
FormRadio.displayName = 'FormRadio'
FormRadio.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
}
export default FormRadio
````

## File: collections/Form/FormSelect.d.ts/FormSelect.d.ts
````typescript
import { StrictSelectProps } from '../../addons/Select'
import { DropdownItemProps } from '../../modules/Dropdown/DropdownItem'
import { StrictFormFieldProps } from './FormField'
import { ForwardRefComponent } from '../../generic'
export interface FormSelectProps extends StrictFormSelectProps {
  [key: string]: any
}
export interface StrictFormSelectProps extends StrictFormFieldProps, StrictSelectProps {
  as?: any
  control?: any
  error?: any
  options: DropdownItemProps[]
}
declare const FormSelect: ForwardRefComponent<FormSelectProps, HTMLDivElement>
export default FormSelect
````

## File: collections/Form/FormSelect.js/FormSelect.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import Select from '../../addons/Select'
import Dropdown from '../../modules/Dropdown'
import FormField from './FormField'
const FormSelect = React.forwardRef(function (props, ref) {
  const { control = Select, options } = props
  const rest = getUnhandledProps(FormSelect, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} options={options} ref={ref} />
})
FormSelect.displayName = 'FormSelect'
FormSelect.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
  options: PropTypes.arrayOf(PropTypes.shape(Dropdown.Item.propTypes)).isRequired,
}
export default FormSelect
````

## File: collections/Form/FormTextArea.d.ts/FormTextArea.d.ts
````typescript
import { StrictTextAreaProps } from '../../addons/TextArea'
import { ForwardRefComponent } from '../../generic'
import { StrictFormFieldProps } from './FormField'
export interface FormTextAreaProps extends StrictFormTextAreaProps {
  [key: string]: any
}
export interface StrictFormTextAreaProps extends StrictFormFieldProps, StrictTextAreaProps {
  as?: any
  control?: any
}
declare const FormTextArea: ForwardRefComponent<FormTextAreaProps, HTMLTextAreaElement>
export default FormTextArea
````

## File: collections/Form/FormTextArea.js/FormTextArea.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
import TextArea from '../../addons/TextArea'
import FormField from './FormField'
const FormTextArea = React.forwardRef(function (props, ref) {
  const { control = TextArea } = props
  const rest = getUnhandledProps(FormTextArea, props)
  const ElementType = getComponentType(props, { defaultAs: FormField })
  return <ElementType {...rest} control={control} ref={ref} />
})
FormTextArea.displayName = 'FormTextArea'
FormTextArea.propTypes = {
  as: PropTypes.elementType,
  control: FormField.propTypes.control,
}
export default FormTextArea
````

## File: collections/Form/index.d.ts/index.d.ts
````typescript
export { default, FormProps, StrictFormProps } from './Form'
````

## File: collections/Form/index.js/index.js
````javascript
export default from './Form'
````

## File: collections/Grid/Grid.d.ts/Grid.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticTEXTALIGNMENTS,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
import GridColumn from './GridColumn'
import GridRow from './GridRow'
export type GridReversedProp =
  | string
  | 'computer'
  | 'computer vertically'
  | 'mobile'
  | 'mobile vertically'
  | 'tablet'
  | 'tablet vertically'
export interface GridProps extends StrictGridProps {
  [key: string]: any
}
export interface StrictGridProps {
  as?: any
  celled?: boolean | 'internally'
  centered?: boolean
  children?: React.ReactNode
  className?: string
  columns?: SemanticWIDTHS | 'equal'
  container?: boolean
  divided?: boolean | 'vertically'
  doubling?: boolean
  inverted?: boolean
  padded?: boolean | 'horizontally' | 'vertically'
  relaxed?: boolean | 'very'
  reversed?: GridReversedProp
  stackable?: boolean
  stretched?: boolean
  textAlign?: SemanticTEXTALIGNMENTS
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const Grid: ForwardRefComponent<GridProps, HTMLDivElement> & {
  Column: typeof GridColumn
  Row: typeof GridRow
}
export default Grid
````

## File: collections/Grid/Grid.js/Grid.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getMultipleProp,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
import GridColumn from './GridColumn'
import GridRow from './GridRow'
const Grid = React.forwardRef(function (props, ref) {
  const {
    celled,
    centered,
    children,
    className,
    columns,
    container,
    divided,
    doubling,
    inverted,
    padded,
    relaxed,
    reversed,
    stackable,
    stretched,
    textAlign,
    verticalAlign,
  } = props
  const classes = cx(
    'ui',
    getKeyOnly(centered, 'centered'),
    getKeyOnly(container, 'container'),
    getKeyOnly(doubling, 'doubling'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(stackable, 'stackable'),
    getKeyOnly(stretched, 'stretched'),
    getKeyOrValueAndKey(celled, 'celled'),
    getKeyOrValueAndKey(divided, 'divided'),
    getKeyOrValueAndKey(padded, 'padded'),
    getKeyOrValueAndKey(relaxed, 'relaxed'),
    getMultipleProp(reversed, 'reversed'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(columns, 'column', true),
    'grid',
    className,
  )
  const rest = getUnhandledProps(Grid, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {children}
    </ElementType>
  )
})
Grid.Column = GridColumn
Grid.Row = GridRow
Grid.displayName = 'Grid'
Grid.propTypes = {
  as: PropTypes.elementType,
  celled: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['internally'])]),
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.oneOf([...SUI.WIDTHS, 'equal']),
  container: PropTypes.bool,
  divided: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['vertically'])]),
  doubling: PropTypes.bool,
  inverted: PropTypes.bool,
  padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]),
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  reversed: customPropTypes.multipleProp([
    'computer',
    'computer vertically',
    'mobile',
    'mobile vertically',
    'tablet',
    'tablet vertically',
  ]),
  stackable: PropTypes.bool,
  stretched: PropTypes.bool,
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
export default Grid
````

## File: collections/Grid/GridColumn.d.ts/GridColumn.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticTEXTALIGNMENTS,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
export type GridOnlyProp =
  | string
  | 'computer'
  | 'largeScreen'
  | 'mobile'
  | 'tablet mobile'
  | 'tablet'
  | 'widescreen'
export interface GridColumnProps extends StrictGridColumnProps {
  [key: string]: any
}
export interface StrictGridColumnProps {
  as?: any
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  computer?: SemanticWIDTHS
  floated?: SemanticFLOATS
  largeScreen?: SemanticWIDTHS
  mobile?: SemanticWIDTHS
  only?: GridOnlyProp
  stretched?: boolean
  tablet?: SemanticWIDTHS
  textAlign?: SemanticTEXTALIGNMENTS
  verticalAlign?: SemanticVERTICALALIGNMENTS
  widescreen?: SemanticWIDTHS
  width?: SemanticWIDTHS
}
declare const GridColumn: ForwardRefComponent<GridColumnProps, HTMLDivElement>
export default GridColumn
````

## File: collections/Grid/GridColumn.js/GridColumn.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  createShorthandFactory,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getMultipleProp,
  getTextAlignProp,
  getValueAndKey,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
const GridColumn = React.forwardRef(function (props, ref) {
  const {
    children,
    className,
    computer,
    color,
    floated,
    largeScreen,
    mobile,
    only,
    stretched,
    tablet,
    textAlign,
    verticalAlign,
    widescreen,
    width,
  } = props
  const classes = cx(
    color,
    getKeyOnly(stretched, 'stretched'),
    getMultipleProp(only, 'only'),
    getTextAlignProp(textAlign),
    getValueAndKey(floated, 'floated'),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(computer, 'wide computer'),
    getWidthProp(largeScreen, 'wide large screen'),
    getWidthProp(mobile, 'wide mobile'),
    getWidthProp(tablet, 'wide tablet'),
    getWidthProp(widescreen, 'wide widescreen'),
    getWidthProp(width, 'wide'),
    'column',
    className,
  )
  const rest = getUnhandledProps(GridColumn, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {children}
    </ElementType>
  )
})
GridColumn.displayName = 'GridColumn'
GridColumn.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  computer: customPropTypes.every([
    customPropTypes.disallow(['width']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),
  floated: PropTypes.oneOf(SUI.FLOATS),
  largeScreen: customPropTypes.every([
    customPropTypes.disallow(['width']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),
  mobile: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),
  only: customPropTypes.multipleProp(SUI.VISIBILITY),
  stretched: PropTypes.bool,
  tablet: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
  widescreen: customPropTypes.every([
    customPropTypes.disallow(['width']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),
  width: customPropTypes.every([
    customPropTypes.disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']),
    PropTypes.oneOf(SUI.WIDTHS),
  ]),
}
GridColumn.create = createShorthandFactory(GridColumn, (children) => ({ children }))
export default GridColumn
````

## File: collections/Grid/GridRow.d.ts/GridRow.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticTEXTALIGNMENTS,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
import { GridReversedProp } from './Grid'
import { GridOnlyProp } from './GridColumn'
export interface GridRowProps extends StrictGridRowProps {
  [key: string]: any
}
export interface StrictGridRowProps {
  as?: any
  centered?: boolean
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  columns?: SemanticWIDTHS | 'equal'
  divided?: boolean
  only?: GridOnlyProp
  reversed?: GridReversedProp
  stretched?: boolean
  textAlign?: SemanticTEXTALIGNMENTS
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const GridRow: ForwardRefComponent<GridRowProps, HTMLDivElement>
export default GridRow
````

## File: collections/Grid/GridRow.js/GridRow.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getMultipleProp,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
const GridRow = React.forwardRef(function (props, ref) {
  const {
    centered,
    children,
    className,
    color,
    columns,
    divided,
    only,
    reversed,
    stretched,
    textAlign,
    verticalAlign,
  } = props
  const classes = cx(
    color,
    getKeyOnly(centered, 'centered'),
    getKeyOnly(divided, 'divided'),
    getKeyOnly(stretched, 'stretched'),
    getMultipleProp(only, 'only'),
    getMultipleProp(reversed, 'reversed'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(columns, 'column', true),
    'row',
    className,
  )
  const rest = getUnhandledProps(GridRow, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {children}
    </ElementType>
  )
})
GridRow.displayName = 'GridRow'
GridRow.propTypes = {
  as: PropTypes.elementType,
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  columns: PropTypes.oneOf([...SUI.WIDTHS, 'equal']),
  divided: PropTypes.bool,
  only: customPropTypes.multipleProp(SUI.VISIBILITY),
  reversed: customPropTypes.multipleProp([
    'computer',
    'computer vertically',
    'mobile',
    'mobile vertically',
    'tablet',
    'tablet vertically',
  ]),
  stretched: PropTypes.bool,
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
export default GridRow
````

## File: collections/Grid/index.d.ts/index.d.ts
````typescript
export { default, GridProps, StrictGridProps } from './Grid'
````

## File: collections/Grid/index.js/index.js
````javascript
export default from './Grid'
````

## File: collections/Menu/index.d.ts/index.d.ts
````typescript
export { default, MenuProps, StrictMenuProps } from './Menu'
````

## File: collections/Menu/index.js/index.js
````javascript
export default from './Menu'
````

## File: collections/Menu/Menu.d.ts/Menu.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandCollection,
  SemanticWIDTHS,
} from '../../generic'
import MenuHeader from './MenuHeader'
import MenuItem, { MenuItemProps } from './MenuItem'
import MenuMenu from './MenuMenu'
export interface MenuProps extends StrictMenuProps {
  [key: string]: any
}
export interface StrictMenuProps {
  as?: any
  activeIndex?: number | string
  attached?: boolean | 'bottom' | 'top'
  borderless?: boolean
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  compact?: boolean
  defaultActiveIndex?: number | string
  fixed?: 'left' | 'right' | 'bottom' | 'top'
  floated?: boolean | 'right'
  fluid?: boolean
  icon?: boolean | 'labeled'
  inverted?: boolean
  items?: SemanticShorthandCollection<MenuItemProps>
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void
  pagination?: boolean
  pointing?: boolean
  secondary?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge' | 'massive'
  stackable?: boolean
  tabular?: boolean | 'right'
  text?: boolean
  vertical?: boolean
  widths?: SemanticWIDTHS
}
declare const Menu: ForwardRefComponent<MenuProps, HTMLDivElement> & {
  Header: typeof MenuHeader
  Item: typeof MenuItem
  Menu: typeof MenuMenu
}
export default Menu
````

## File: collections/Menu/Menu.js/Menu.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  createShorthandFactory,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getWidthProp,
  useAutoControlledValue,
} from '../../lib'
import MenuHeader from './MenuHeader'
import MenuItem from './MenuItem'
import MenuMenu from './MenuMenu'
const Menu = React.forwardRef(function (props, ref) {
  const {
    attached,
    borderless,
    children,
    className,
    color,
    compact,
    fixed,
    floated,
    fluid,
    icon,
    inverted,
    items,
    pagination,
    pointing,
    secondary,
    size,
    stackable,
    tabular,
    text,
    vertical,
    widths,
  } = props
  const [activeIndex, setActiveIndex] = useAutoControlledValue({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: -1,
  })
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(borderless, 'borderless'),
    getKeyOnly(compact, 'compact'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(pagination, 'pagination'),
    getKeyOnly(pointing, 'pointing'),
    getKeyOnly(secondary, 'secondary'),
    getKeyOnly(stackable, 'stackable'),
    getKeyOnly(text, 'text'),
    getKeyOnly(vertical, 'vertical'),
    getKeyOrValueAndKey(attached, 'attached'),
    getKeyOrValueAndKey(floated, 'floated'),
    getKeyOrValueAndKey(icon, 'icon'),
    getKeyOrValueAndKey(tabular, 'tabular'),
    getValueAndKey(fixed, 'fixed'),
    getWidthProp(widths, 'item'),
    className,
    'menu',
  )
  const rest = getUnhandledProps(Menu, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {_.map(items, (item, index) =>
        MenuItem.create(item, {
          defaultProps: {
            active: parseInt(activeIndex, 10) === index,
            index,
          },
          overrideProps: (predefinedProps) => ({
            onClick: (e, itemProps) => {
              const itemIndex = itemProps.index
              setActiveIndex(itemIndex)
              _.invoke(predefinedProps, 'onClick', e, itemProps)
              _.invoke(props, 'onItemClick', e, itemProps)
            },
          }),
        }),
      )}
    </ElementType>
  )
})
Menu.displayName = 'Menu'
Menu.propTypes = {
  as: PropTypes.elementType,
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
  borderless: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  compact: PropTypes.bool,
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fixed: PropTypes.oneOf(['left', 'right', 'bottom', 'top']),
  floated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),
  fluid: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['labeled'])]),
  inverted: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
  pagination: PropTypes.bool,
  pointing: PropTypes.bool,
  secondary: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium', 'big')),
  stackable: PropTypes.bool,
  tabular: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),
  text: PropTypes.bool,
  vertical: PropTypes.bool,
  widths: PropTypes.oneOf(SUI.WIDTHS),
}
Menu.Header = MenuHeader
Menu.Item = MenuItem
Menu.Menu = MenuMenu
Menu.create = createShorthandFactory(Menu, (items) => ({ items }))
export default Menu
````

## File: collections/Menu/MenuHeader.d.ts/MenuHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface MenuHeaderProps extends StrictMenuHeaderProps {
  [key: string]: any
}
export interface StrictMenuHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const MenuHeader: ForwardRefComponent<MenuHeaderProps, HTMLDivElement>
export default MenuHeader
````

## File: collections/Menu/MenuHeader.js/MenuHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const MenuHeader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(MenuHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
MenuHeader.displayName = 'MenuHeader'
MenuHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default MenuHeader
````

## File: collections/Menu/MenuItem.d.ts/MenuItem.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface MenuItemProps extends StrictMenuItemProps {
  [key: string]: any
}
export interface StrictMenuItemProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  disabled?: boolean
  fitted?: boolean | 'horizontally' | 'vertically'
  header?: boolean
  icon?: boolean | SemanticShorthandItem<IconProps>
  index?: number
  link?: boolean
  name?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: MenuItemProps) => void
  position?: 'left' | 'right'
}
declare const MenuItem: ForwardRefComponent<MenuItemProps, HTMLDivElement>
export default MenuItem
````

## File: collections/Menu/MenuItem.js/MenuItem.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  useEventCallback,
} from '../../lib'
import Icon from '../../elements/Icon'
const MenuItem = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    color,
    content,
    disabled,
    fitted,
    header,
    icon,
    link,
    name,
    onClick,
    position,
  } = props
  const classes = cx(
    color,
    position,
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(icon === true || (icon && !(name || content)), 'icon'),
    getKeyOnly(header, 'header'),
    getKeyOnly(link, 'link'),
    getKeyOrValueAndKey(fitted, 'fitted'),
    'item',
    className,
  )
  const ElementType = getComponentType(props, {
    getDefault: () => {
      if (onClick) return 'a'
    },
  })
  const rest = getUnhandledProps(MenuItem, props)
  const handleClick = useEventCallback((e) => {
    if (!disabled) {
      _.invoke(props, 'onClick', e, props)
    }
  })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {childrenUtils.isNil(content) ? _.startCase(name) : content}
    </ElementType>
  )
})
MenuItem.displayName = 'MenuItem'
MenuItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  fitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['horizontally', 'vertically'])]),
  header: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  index: PropTypes.number,
  link: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
}
MenuItem.create = createShorthandFactory(MenuItem, (val) => ({ content: val, name: val }))
export default MenuItem
````

## File: collections/Menu/MenuMenu.d.ts/MenuMenu.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface MenuMenuProps extends StrictMenuMenuProps {
  [key: string]: any
}
export interface StrictMenuMenuProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  position?: 'left' | 'right'
}
declare const MenuMenu: ForwardRefComponent<MenuMenuProps, HTMLDivElement>
export default MenuMenu
````

## File: collections/Menu/MenuMenu.js/MenuMenu.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const MenuMenu = React.forwardRef(function (props, ref) {
  const { children, className, content, position } = props
  const classes = cx(position, 'menu', className)
  const rest = getUnhandledProps(MenuMenu, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
MenuMenu.displayName = 'MenuMenu'
MenuMenu.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  position: PropTypes.oneOf(['left', 'right']),
}
export default MenuMenu
````

## File: collections/Message/index.d.ts/index.d.ts
````typescript
export { default, MessageProps, StrictMessageProps, MessageSizeProp } from './Message'
````

## File: collections/Message/index.js/index.js
````javascript
export default from './Message'
````

## File: collections/Message/Message.d.ts/Message.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import MessageContent from './MessageContent'
import MessageHeader, { MessageHeaderProps } from './MessageHeader'
import MessageItem, { MessageItemProps } from './MessageItem'
import MessageList from './MessageList'
export type MessageSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
export interface MessageProps extends StrictMessageProps {
  [key: string]: any
}
export interface StrictMessageProps {
  as?: any
  attached?: boolean | 'bottom' | 'top'
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  compact?: boolean
  content?: SemanticShorthandContent
  error?: boolean
  floating?: boolean
  header?: SemanticShorthandItem<MessageHeaderProps>
  hidden?: boolean
  icon?: any | boolean
  info?: boolean
  list?: SemanticShorthandCollection<MessageItemProps>
  negative?: boolean
  onDismiss?: (event: React.MouseEvent<HTMLElement>, data: MessageProps) => void
  positive?: boolean
  size?: MessageSizeProp
  success?: boolean
  visible?: boolean
  warning?: boolean
}
declare const Message: ForwardRefComponent<MessageProps, HTMLDivElement> & {
  Content: typeof MessageContent
  Header: typeof MessageHeader
  List: typeof MessageList
  Item: typeof MessageItem
}
export default Message
````

## File: collections/Message/Message.js/Message.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createHTMLParagraph,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  useEventCallback,
} from '../../lib'
import Icon from '../../elements/Icon'
import MessageContent from './MessageContent'
import MessageHeader from './MessageHeader'
import MessageList from './MessageList'
import MessageItem from './MessageItem'
const Message = React.forwardRef(function (props, ref) {
  const {
    attached,
    children,
    className,
    color,
    compact,
    content,
    error,
    floating,
    header,
    hidden,
    icon,
    info,
    list,
    negative,
    onDismiss,
    positive,
    size,
    success,
    visible,
    warning,
  } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(compact, 'compact'),
    getKeyOnly(error, 'error'),
    getKeyOnly(floating, 'floating'),
    getKeyOnly(hidden, 'hidden'),
    getKeyOnly(icon, 'icon'),
    getKeyOnly(info, 'info'),
    getKeyOnly(negative, 'negative'),
    getKeyOnly(positive, 'positive'),
    getKeyOnly(success, 'success'),
    getKeyOnly(visible, 'visible'),
    getKeyOnly(warning, 'warning'),
    getKeyOrValueAndKey(attached, 'attached'),
    'message',
    className,
  )
  const rest = getUnhandledProps(Message, props)
  const ElementType = getComponentType(props)
  const handleDismiss = useEventCallback((e) => {
    _.invoke(props, 'onDismiss', e, props)
  })
  const dismissIcon = onDismiss && <Icon name='close' onClick={handleDismiss} />
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {dismissIcon}
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {dismissIcon}
      {Icon.create(icon, { autoGenerateKey: false })}
      {(!_.isNil(header) || !_.isNil(content) || !_.isNil(list)) && (
        <MessageContent>
          {MessageHeader.create(header, { autoGenerateKey: false })}
          {MessageList.create(list, { autoGenerateKey: false })}
          {createHTMLParagraph(content, { autoGenerateKey: false })}
        </MessageContent>
      )}
    </ElementType>
  )
})
Message.displayName = 'Message'
Message.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['bottom', 'top'])]),
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  compact: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  error: PropTypes.bool,
  floating: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  hidden: PropTypes.bool,
  icon: PropTypes.oneOfType([customPropTypes.itemShorthand, PropTypes.bool]),
  info: PropTypes.bool,
  list: customPropTypes.collectionShorthand,
  negative: PropTypes.bool,
  onDismiss: PropTypes.func,
  positive: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  success: PropTypes.bool,
  visible: PropTypes.bool,
  warning: PropTypes.bool,
}
Message.Content = MessageContent
Message.Header = MessageHeader
Message.List = MessageList
Message.Item = MessageItem
export default Message
````

## File: collections/Message/MessageContent.d.ts/MessageContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface MessageContentProps extends StrictMessageContentProps {
  [key: string]: any
}
export interface StrictMessageContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const MessageContent: ForwardRefComponent<MessageContentProps, HTMLDivElement>
export default MessageContent
````

## File: collections/Message/MessageContent.js/MessageContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const MessageContent = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(MessageContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
MessageContent.displayName = 'MessageContent'
MessageContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default MessageContent
````

## File: collections/Message/MessageHeader.d.ts/MessageHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface MessageHeaderProps extends StrictMessageHeaderProps {
  [key: string]: any
}
export interface StrictMessageHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const MessageHeader: ForwardRefComponent<MessageHeaderProps, HTMLDivElement>
export default MessageHeader
````

## File: collections/Message/MessageHeader.js/MessageHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const MessageHeader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(MessageHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
MessageHeader.displayName = 'MessageHeader'
MessageHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
MessageHeader.create = createShorthandFactory(MessageHeader, (val) => ({ content: val }))
export default MessageHeader
````

## File: collections/Message/MessageItem.d.ts/MessageItem.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface MessageItemProps extends StrictMessageItemProps {
  [key: string]: any
}
export interface StrictMessageItemProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const MessageItem: ForwardRefComponent<MessageItemProps, HTMLLIElement>
export default MessageItem
````

## File: collections/Message/MessageItem.js/MessageItem.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const MessageItem = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(MessageItem, props)
  const ElementType = getComponentType(props, { defaultAs: 'li' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
MessageItem.displayName = 'MessageItem'
MessageItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
MessageItem.create = createShorthandFactory(MessageItem, (content) => ({ content }))
export default MessageItem
````

## File: collections/Message/MessageList.d.ts/MessageList.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandCollection } from '../../generic'
import { MessageItemProps } from './MessageItem'
export interface MessageListProps extends StrictMessageListProps {
  [key: string]: any
}
export interface StrictMessageListProps {
  as?: any
  children?: React.ReactNode
  className?: string
  items?: SemanticShorthandCollection<MessageItemProps>
}
declare const MessageList: ForwardRefComponent<MessageListProps, HTMLUListElement>
export default MessageList
````

## File: collections/Message/MessageList.js/MessageList.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import MessageItem from './MessageItem'
const MessageList = React.forwardRef(function (props, ref) {
  const { children, className, items } = props
  const classes = cx('list', className)
  const rest = getUnhandledProps(MessageList, props)
  const ElementType = getComponentType(props, { defaultAs: 'ul' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? _.map(items, MessageItem.create) : children}
    </ElementType>
  )
})
MessageList.displayName = 'MessageList'
MessageList.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  items: customPropTypes.collectionShorthand,
}
MessageList.create = createShorthandFactory(MessageList, (val) => ({ items: val }))
export default MessageList
````

## File: collections/Table/index.d.ts/index.d.ts
````typescript
export { default, TableProps, StrictTableProps } from './Table'
````

## File: collections/Table/index.js/index.js
````javascript
export default from './Table'
````

## File: collections/Table/Table.d.ts/Table.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandCollection,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
import TableBody from './TableBody'
import TableCell from './TableCell'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import TableHeaderCell from './TableHeaderCell'
import TableRow, { TableRowProps } from './TableRow'
export interface TableProps extends StrictTableProps {
  [key: string]: any
}
export interface StrictTableProps {
  as?: any
  attached?: boolean | 'top' | 'bottom'
  basic?: boolean | 'very'
  celled?: boolean | 'internally'
  children?: React.ReactNode
  className?: string
  collapsing?: boolean
  color?: SemanticCOLORS
  columns?: SemanticWIDTHS
  compact?: boolean | 'very'
  definition?: boolean
  fixed?: boolean
  footerRow?: SemanticShorthandItem<TableRowProps>
  headerRow?: SemanticShorthandItem<TableRowProps>
  headerRows?: SemanticShorthandCollection<TableRowProps>
  inverted?: boolean
  padded?: boolean | 'very'
  renderBodyRow?: (data: any, index: number) => any
  selectable?: boolean
  singleLine?: boolean
  size?: 'small' | 'large'
  sortable?: boolean
  stackable?: boolean
  striped?: boolean
  structured?: boolean
  tableData?: any[]
  textAlign?: 'center' | 'left' | 'right'
  unstackable?: boolean
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const Table: ForwardRefComponent<TableProps, HTMLTableElement> & {
  Body: typeof TableBody
  Cell: typeof TableCell
  Footer: typeof TableFooter
  Header: typeof TableHeader
  HeaderCell: typeof TableHeaderCell
  Row: typeof TableRow
}
export default Table
````

## File: collections/Table/Table.js/Table.js
````javascript
import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
import TableBody from './TableBody'
import TableCell from './TableCell'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import TableHeaderCell from './TableHeaderCell'
import TableRow from './TableRow'
const Table = React.forwardRef(function (props, ref) {
  const {
    attached,
    basic,
    celled,
    children,
    className,
    collapsing,
    color,
    columns,
    compact,
    definition,
    fixed,
    footerRow,
    headerRow,
    headerRows,
    inverted,
    padded,
    renderBodyRow,
    selectable,
    singleLine,
    size,
    sortable,
    stackable,
    striped,
    structured,
    tableData,
    textAlign,
    unstackable,
    verticalAlign,
  } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(celled, 'celled'),
    getKeyOnly(collapsing, 'collapsing'),
    getKeyOnly(definition, 'definition'),
    getKeyOnly(fixed, 'fixed'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(selectable, 'selectable'),
    getKeyOnly(singleLine, 'single line'),
    getKeyOnly(sortable, 'sortable'),
    getKeyOnly(stackable, 'stackable'),
    getKeyOnly(striped, 'striped'),
    getKeyOnly(structured, 'structured'),
    getKeyOnly(unstackable, 'unstackable'),
    getKeyOrValueAndKey(attached, 'attached'),
    getKeyOrValueAndKey(basic, 'basic'),
    getKeyOrValueAndKey(compact, 'compact'),
    getKeyOrValueAndKey(padded, 'padded'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(columns, 'column'),
    'table',
    className,
  )
  const rest = getUnhandledProps(Table, props)
  const ElementType = getComponentType(props, { defaultAs: 'table' })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const hasHeaderRows = headerRow || headerRows
  const headerShorthandOptions = { defaultProps: { cellAs: 'th' } }
  const headerElement = hasHeaderRows && (
    <TableHeader>
      {TableRow.create(headerRow, headerShorthandOptions)}
      {_.map(headerRows, (data) => TableRow.create(data, headerShorthandOptions))}
    </TableHeader>
  )
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {headerElement}
      <TableBody>
        {renderBodyRow &&
          _.map(tableData, (data, index) => TableRow.create(renderBodyRow(data, index)))}
      </TableBody>
      {footerRow && <TableFooter>{TableRow.create(footerRow)}</TableFooter>}
    </ElementType>
  )
})
Table.displayName = 'Table'
Table.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
  basic: PropTypes.oneOfType([PropTypes.oneOf(['very']), PropTypes.bool]),
  celled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  collapsing: PropTypes.bool,
  color: PropTypes.oneOf(SUI.COLORS),
  columns: PropTypes.oneOf(SUI.WIDTHS),
  compact: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  definition: PropTypes.bool,
  fixed: PropTypes.bool,
  footerRow: customPropTypes.itemShorthand,
  headerRow: customPropTypes.every([
    customPropTypes.disallow(['headerRows']),
    customPropTypes.itemShorthand,
  ]),
  headerRows: customPropTypes.every([
    customPropTypes.disallow(['headerRow']),
    customPropTypes.collectionShorthand,
  ]),
  inverted: PropTypes.bool,
  padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  renderBodyRow: customPropTypes.every([
    customPropTypes.disallow(['children']),
    customPropTypes.demand(['tableData']),
    PropTypes.func,
  ]),
  selectable: PropTypes.bool,
  singleLine: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')),
  sortable: PropTypes.bool,
  stackable: PropTypes.bool,
  striped: PropTypes.bool,
  structured: PropTypes.bool,
  tableData: customPropTypes.every([
    customPropTypes.disallow(['children']),
    customPropTypes.demand(['renderBodyRow']),
    PropTypes.array,
  ]),
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
  unstackable: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
Table.Body = TableBody
Table.Cell = TableCell
Table.Footer = TableFooter
Table.Header = TableHeader
Table.HeaderCell = TableHeaderCell
Table.Row = TableRow
export default Table
````

## File: collections/Table/TableBody.d.ts/TableBody.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent } from '../../generic'
export interface TableBodyProps extends StrictTableBodyProps {
  [key: string]: any
}
export interface StrictTableBodyProps {
  as?: any
  children?: React.ReactNode
  className?: string
}
declare const TableBody: ForwardRefComponent<TableBodyProps, HTMLTableSectionElement>
export default TableBody
````

## File: collections/Table/TableBody.js/TableBody.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
const TableBody = React.forwardRef(function (props, ref) {
  const { children, className } = props
  const classes = cx(className)
  const rest = getUnhandledProps(TableBody, props)
  const ElementType = getComponentType(props, { defaultAs: 'tbody' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {children}
    </ElementType>
  )
})
TableBody.displayName = 'TableBody'
TableBody.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}
export default TableBody
````

## File: collections/Table/TableCell.d.ts/TableCell.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
  SemanticWIDTHS,
} from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface TableCellProps extends StrictTableCellProps {
  [key: string]: any
}
export interface StrictTableCellProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  collapsing?: boolean
  content?: SemanticShorthandContent
  disabled?: boolean
  error?: boolean
  icon?: SemanticShorthandItem<IconProps>
  negative?: boolean
  positive?: boolean
  selectable?: boolean
  singleLine?: boolean
  textAlign?: 'center' | 'left' | 'right'
  verticalAlign?: SemanticVERTICALALIGNMENTS
  warning?: boolean
  width?: SemanticWIDTHS
}
declare const TableCell: ForwardRefComponent<TableCellProps, HTMLTableCellElement>
export default TableCell
````

## File: collections/Table/TableCell.js/TableCell.js
````javascript
import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from '../../lib'
import Icon from '../../elements/Icon'
const TableCell = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    collapsing,
    content,
    disabled,
    error,
    icon,
    negative,
    positive,
    selectable,
    singleLine,
    textAlign,
    verticalAlign,
    warning,
    width,
  } = props
  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(collapsing, 'collapsing'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(error, 'error'),
    getKeyOnly(negative, 'negative'),
    getKeyOnly(positive, 'positive'),
    getKeyOnly(selectable, 'selectable'),
    getKeyOnly(singleLine, 'single line'),
    getKeyOnly(warning, 'warning'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    getWidthProp(width, 'wide'),
    className,
  )
  const rest = getUnhandledProps(TableCell, props)
  const ElementType = getComponentType(props, { defaultAs: 'td' })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {Icon.create(icon)}
      {content}
    </ElementType>
  )
})
TableCell.displayName = 'TableCell'
TableCell.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  collapsing: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  icon: customPropTypes.itemShorthand,
  negative: PropTypes.bool,
  positive: PropTypes.bool,
  selectable: PropTypes.bool,
  singleLine: PropTypes.bool,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
  warning: PropTypes.bool,
  width: PropTypes.oneOf(SUI.WIDTHS),
}
TableCell.create = createShorthandFactory(TableCell, (content) => ({ content }))
export default TableCell
````

## File: collections/Table/TableFooter.d.ts/TableFooter.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
import { StrictTableHeaderProps } from './TableHeader'
export interface TableFooterProps extends StrictTableFooterProps {
  [key: string]: any
}
export interface StrictTableFooterProps extends StrictTableHeaderProps {
  as?: any
}
declare const TableFooter: ForwardRefComponent<TableFooterProps, HTMLTableSectionElement>
export default TableFooter
````

## File: collections/Table/TableFooter.js/TableFooter.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { getUnhandledProps } from '../../lib'
import TableHeader from './TableHeader'
const TableFooter = React.forwardRef(function (props, ref) {
  const { as = 'tfoot' } = props
  const rest = getUnhandledProps(TableFooter, props)
  return <TableHeader {...rest} as={as} ref={ref} />
})
TableFooter.displayName = 'TableFooter'
TableFooter.propTypes = {
  as: PropTypes.elementType,
}
export default TableFooter
````

## File: collections/Table/TableHeader.d.ts/TableHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface TableHeaderProps extends StrictTableHeaderProps {
  [key: string]: any
}
export interface StrictTableHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  fullWidth?: boolean
}
declare const TableHeader: ForwardRefComponent<TableHeaderProps, HTMLTableSectionElement>
export default TableHeader
````

## File: collections/Table/TableHeader.js/TableHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const TableHeader = React.forwardRef(function (props, ref) {
  const { children, className, content, fullWidth } = props
  const classes = cx(getKeyOnly(fullWidth, 'full-width'), className)
  const rest = getUnhandledProps(TableHeader, props)
  const ElementType = getComponentType(props, { defaultAs: 'thead' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
TableHeader.displayName = 'TableHeader'
TableHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  fullWidth: PropTypes.bool,
}
export default TableHeader
````

## File: collections/Table/TableHeaderCell.d.ts/TableHeaderCell.d.ts
````typescript
import { StrictTableCellProps } from './TableCell'
import { ForwardRefComponent } from '../../generic'
export interface TableHeaderCellProps extends StrictTableHeaderCellProps {
  [key: string]: any
}
export interface StrictTableHeaderCellProps extends StrictTableCellProps {
  as?: any
  className?: string
  sorted?: 'ascending' | 'descending'
}
declare const TableHeaderCell: ForwardRefComponent<TableHeaderCellProps, HTMLTableCellElement>
export default TableHeaderCell
````

## File: collections/Table/TableHeaderCell.js/TableHeaderCell.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getUnhandledProps, getValueAndKey } from '../../lib'
import TableCell from './TableCell'
const TableHeaderCell = React.forwardRef(function (props, ref) {
  const { as = 'th', className, sorted } = props
  const classes = cx(getValueAndKey(sorted, 'sorted'), className)
  const rest = getUnhandledProps(TableHeaderCell, props)
  return <TableCell {...rest} as={as} className={classes} ref={ref} />
})
TableHeaderCell.displayName = 'TableHeaderCell'
TableHeaderCell.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  sorted: PropTypes.oneOf(['ascending', 'descending']),
}
export default TableHeaderCell
````

## File: collections/Table/TableRow.d.ts/TableRow.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandCollection,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import { TableCellProps } from './TableCell'
export interface TableRowProps extends StrictTableRowProps {
  [key: string]: any
}
export interface StrictTableRowProps {
  as?: any
  active?: boolean
  cellAs?: any
  cells?: SemanticShorthandCollection<TableCellProps>
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  error?: boolean
  negative?: boolean
  positive?: boolean
  textAlign?: 'center' | 'left' | 'right'
  verticalAlign?: SemanticVERTICALALIGNMENTS
  warning?: boolean
}
declare const TableRow: ForwardRefComponent<TableRowProps, HTMLTableCellElement>
export default TableRow
````

## File: collections/Table/TableRow.js/TableRow.js
````javascript
import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
  getVerticalAlignProp,
} from '../../lib'
import TableCell from './TableCell'
const TableRow = React.forwardRef(function (props, ref) {
  const {
    active,
    cellAs = 'td',
    cells,
    children,
    className,
    disabled,
    error,
    negative,
    positive,
    textAlign,
    verticalAlign,
    warning,
  } = props
  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(error, 'error'),
    getKeyOnly(negative, 'negative'),
    getKeyOnly(positive, 'positive'),
    getKeyOnly(warning, 'warning'),
    getTextAlignProp(textAlign),
    getVerticalAlignProp(verticalAlign),
    className,
  )
  const rest = getUnhandledProps(TableRow, props)
  const ElementType = getComponentType(props, { defaultAs: 'tr' })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {_.map(cells, (cell) => TableCell.create(cell, { defaultProps: { as: cellAs } }))}
    </ElementType>
  )
})
TableRow.displayName = 'TableRow'
TableRow.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  cellAs: PropTypes.elementType,
  cells: customPropTypes.collectionShorthand,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  negative: PropTypes.bool,
  positive: PropTypes.bool,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
  warning: PropTypes.bool,
}
TableRow.create = createShorthandFactory(TableRow, (cells) => ({ cells }))
export default TableRow
````

## File: elements/Button/Button.d.ts/Button.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticSIZES,
} from '../../generic'
import { IconProps } from '../Icon'
import { LabelProps } from '../Label'
import ButtonContent from './ButtonContent'
import ButtonGroup from './ButtonGroup'
import ButtonOr from './ButtonOr'
export interface ButtonProps extends StrictButtonProps {
  [key: string]: any
}
export interface StrictButtonProps {
  as?: any
  active?: boolean
  animated?: boolean | 'fade' | 'vertical'
  attached?: boolean | 'left' | 'right' | 'top' | 'bottom'
  basic?: boolean
  children?: React.ReactNode
  circular?: boolean
  className?: string
  color?:
    | SemanticCOLORS
    | 'facebook'
    | 'google plus'
    | 'vk'
    | 'twitter'
    | 'linkedin'
    | 'instagram'
    | 'youtube'
  compact?: boolean
  content?: SemanticShorthandContent
  disabled?: boolean
  floated?: SemanticFLOATS
  fluid?: boolean
  icon?: boolean | SemanticShorthandItem<IconProps>
  inverted?: boolean
  label?: SemanticShorthandItem<LabelProps>
  labelPosition?: 'right' | 'left'
  loading?: boolean
  negative?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void
  positive?: boolean
  primary?: boolean
  role?: string
  secondary?: boolean
  size?: SemanticSIZES
  tabIndex?: number | string
  toggle?: boolean
  type?: 'submit' | 'reset' | 'button'
}
declare const Button: ForwardRefComponent<ButtonProps, HTMLButtonElement> & {
  Content: typeof ButtonContent
  Group: typeof ButtonGroup
  Or: typeof ButtonOr
}
export default Button
````

## File: elements/Button/Button.js/Button.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  createShorthandFactory,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  useMergedRefs,
} from '../../lib'
import Icon from '../Icon/Icon'
import Label from '../Label/Label'
import ButtonContent from './ButtonContent'
import ButtonGroup from './ButtonGroup'
import ButtonOr from './ButtonOr'
function computeButtonAriaRole(ElementType, role) {
  if (!_.isNil(role)) {
    return role
  }
  if (ElementType !== 'button') {
    return 'button'
  }
}
function computeTabIndex(ElementType, disabled, tabIndex) {
  if (!_.isNil(tabIndex)) {
    return tabIndex
  }
  if (disabled) {
    return -1
  }
  if (ElementType === 'div') {
    return 0
  }
}
function hasIconClass(props) {
  const { children, content, icon, labelPosition } = props
  if (icon === true) {
    return true
  }
  if (icon) {
    return labelPosition || (childrenUtils.isNil(children) && _.isNil(content))
  }
}
const Button = React.forwardRef(function (props, ref) {
  const {
    active,
    animated,
    attached,
    basic,
    children,
    circular,
    className,
    color,
    compact,
    content,
    disabled,
    floated,
    fluid,
    icon,
    inverted,
    label,
    labelPosition,
    loading,
    negative,
    positive,
    primary,
    secondary,
    size,
    toggle,
    type,
  } = props
  const elementRef = useMergedRefs(ref, React.useRef())
  const baseClasses = cx(
    color,
    size,
    getKeyOnly(active, 'active'),
    getKeyOnly(basic, 'basic'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(compact, 'compact'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(hasIconClass(props), 'icon'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(loading, 'loading'),
    getKeyOnly(negative, 'negative'),
    getKeyOnly(positive, 'positive'),
    getKeyOnly(primary, 'primary'),
    getKeyOnly(secondary, 'secondary'),
    getKeyOnly(toggle, 'toggle'),
    getKeyOrValueAndKey(animated, 'animated'),
    getKeyOrValueAndKey(attached, 'attached'),
  )
  const labeledClasses = cx(getKeyOrValueAndKey(labelPosition || !!label, 'labeled'))
  const wrapperClasses = cx(getKeyOnly(disabled, 'disabled'), getValueAndKey(floated, 'floated'))
  const rest = getUnhandledProps(Button, props)
  const ElementType = getComponentType(props, {
    defaultAs: 'button',
    getDefault: () => {
      if (!_.isNil(attached) || !_.isNil(label)) {
        return 'div'
      }
    },
  })
  const tabIndex = computeTabIndex(ElementType, disabled, props.tabIndex)
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    _.invoke(props, 'onClick', e, props)
  }
  if (!_.isNil(label)) {
    const buttonClasses = cx('ui', baseClasses, 'button', className)
    const containerClasses = cx('ui', labeledClasses, 'button', className, wrapperClasses)
    const labelElement = Label.create(label, {
      defaultProps: {
        basic: true,
        pointing: labelPosition === 'left' ? 'right' : 'left',
      },
      autoGenerateKey: false,
    })
    return (
      <ElementType {...rest} className={containerClasses} onClick={handleClick}>
        {labelPosition === 'left' && labelElement}
        <button
          className={buttonClasses}
          aria-pressed={toggle ? !!active : undefined}
          disabled={disabled}
          tabIndex={tabIndex}
          type={type}
          ref={elementRef}
        >
          {Icon.create(icon, { autoGenerateKey: false })} {content}
        </button>
        {(labelPosition === 'right' || !labelPosition) && labelElement}
      </ElementType>
    )
  }
  const classes = cx('ui', baseClasses, wrapperClasses, labeledClasses, 'button', className)
  const hasChildren = !childrenUtils.isNil(children)
  const role = computeButtonAriaRole(ElementType, props.role)
  return (
    <ElementType
      {...rest}
      className={classes}
      aria-pressed={toggle ? !!active : undefined}
      disabled={(disabled && ElementType === 'button') || undefined}
      onClick={handleClick}
      role={role}
      tabIndex={tabIndex}
      type={type}
      ref={elementRef}
    >
      {hasChildren && children}
      {!hasChildren && Icon.create(icon, { autoGenerateKey: false })}
      {!hasChildren && content}
    </ElementType>
  )
})
Button.displayName = 'Button'
Button.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  animated: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['fade', 'vertical'])]),
  attached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  ]),
  basic: PropTypes.bool,
  children: customPropTypes.every([
    PropTypes.node,
    customPropTypes.disallow(['label']),
    customPropTypes.givenProps(
      {
        icon: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.object.isRequired,
          PropTypes.element.isRequired,
        ]),
      },
      customPropTypes.disallow(['icon']),
    ),
  ]),
  circular: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    ...SUI.COLORS,
    'facebook',
    'google plus',
    'instagram',
    'linkedin',
    'twitter',
    'vk',
    'youtube',
  ]),
  compact: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  floated: PropTypes.oneOf(SUI.FLOATS),
  fluid: PropTypes.bool,
  icon: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
    PropTypes.element,
  ]),
  inverted: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element]),
  labelPosition: PropTypes.oneOf(['right', 'left']),
  loading: PropTypes.bool,
  negative: PropTypes.bool,
  onClick: PropTypes.func,
  positive: PropTypes.bool,
  primary: PropTypes.bool,
  role: PropTypes.string,
  secondary: PropTypes.bool,
  size: PropTypes.oneOf(SUI.SIZES),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggle: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}
Button.Content = ButtonContent
Button.Group = ButtonGroup
Button.Or = ButtonOr
Button.create = createShorthandFactory(Button, (value) => ({ content: value }))
export default Button
````

## File: elements/Button/ButtonContent.d.ts/ButtonContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ButtonContentProps extends StrictButtonContentProps {
  [key: string]: any
}
export interface StrictButtonContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  hidden?: boolean
  visible?: boolean
}
declare const ButtonContent: ForwardRefComponent<ButtonContentProps, HTMLDivElement>
export default ButtonContent
````

## File: elements/Button/ButtonContent.js/ButtonContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const ButtonContent = React.forwardRef(function (props, ref) {
  const { children, className, content, hidden, visible } = props
  const classes = cx(
    getKeyOnly(visible, 'visible'),
    getKeyOnly(hidden, 'hidden'),
    'content',
    className,
  )
  const rest = getUnhandledProps(ButtonContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ButtonContent.displayName = 'ButtonContent'
ButtonContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  hidden: PropTypes.bool,
  visible: PropTypes.bool,
}
export default ButtonContent
````

## File: elements/Button/ButtonGroup.d.ts/ButtonGroup.d.ts
````typescript
import * as React from 'react'
import {
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandCollection,
  SemanticSIZES,
  SemanticWIDTHS,
  ForwardRefComponent,
} from '../../generic'
import { ButtonProps } from './Button'
export interface ButtonGroupProps extends StrictButtonGroupProps {
  [key: string]: any
}
export interface StrictButtonGroupProps {
  as?: any
  attached?: boolean | 'left' | 'right' | 'top' | 'bottom'
  basic?: boolean
  buttons?: SemanticShorthandCollection<ButtonProps>
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  compact?: boolean
  content?: SemanticShorthandContent
  floated?: SemanticFLOATS
  fluid?: boolean
  icon?: boolean
  inverted?: boolean
  labeled?: boolean
  negative?: boolean
  positive?: boolean
  primary?: boolean
  secondary?: boolean
  size?: SemanticSIZES
  toggle?: boolean
  vertical?: boolean
  widths?: SemanticWIDTHS
}
declare const ButtonGroup: ForwardRefComponent<ButtonGroupProps, HTMLDivElement>
export default ButtonGroup
````

## File: elements/Button/ButtonGroup.js/ButtonGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getWidthProp,
} from '../../lib'
import Button from './Button'
const ButtonGroup = React.forwardRef(function (props, ref) {
  const {
    attached,
    basic,
    buttons,
    children,
    className,
    color,
    compact,
    content,
    floated,
    fluid,
    icon,
    inverted,
    labeled,
    negative,
    positive,
    primary,
    secondary,
    size,
    toggle,
    vertical,
    widths,
  } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(basic, 'basic'),
    getKeyOnly(compact, 'compact'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(icon, 'icon'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(labeled, 'labeled'),
    getKeyOnly(negative, 'negative'),
    getKeyOnly(positive, 'positive'),
    getKeyOnly(primary, 'primary'),
    getKeyOnly(secondary, 'secondary'),
    getKeyOnly(toggle, 'toggle'),
    getKeyOnly(vertical, 'vertical'),
    getKeyOrValueAndKey(attached, 'attached'),
    getValueAndKey(floated, 'floated'),
    getWidthProp(widths),
    'buttons',
    className,
  )
  const rest = getUnhandledProps(ButtonGroup, props)
  const ElementType = getComponentType(props)
  if (_.isNil(buttons)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {_.map(buttons, (button) => Button.create(button))}
    </ElementType>
  )
})
ButtonGroup.displayName = 'ButtonGroup'
ButtonGroup.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  ]),
  basic: PropTypes.bool,
  buttons: customPropTypes.collectionShorthand,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  compact: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  floated: PropTypes.oneOf(SUI.FLOATS),
  fluid: PropTypes.bool,
  icon: PropTypes.bool,
  inverted: PropTypes.bool,
  labeled: PropTypes.bool,
  negative: PropTypes.bool,
  positive: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  size: PropTypes.oneOf(SUI.SIZES),
  toggle: PropTypes.bool,
  vertical: PropTypes.bool,
  widths: PropTypes.oneOf(SUI.WIDTHS),
}
export default ButtonGroup
````

## File: elements/Button/ButtonOr.d.ts/ButtonOr.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export interface ButtonOrProps extends StrictButtonOrProps {
  [key: string]: any
}
export interface StrictButtonOrProps {
  as?: any
  className?: string
  text?: number | string
}
declare const ButtonOr: ForwardRefComponent<ButtonOrProps, HTMLDivElement>
export default ButtonOr
````

## File: elements/Button/ButtonOr.js/ButtonOr.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
const ButtonOr = React.forwardRef(function (props, ref) {
  const { className, text } = props
  const classes = cx('or', className)
  const rest = getUnhandledProps(ButtonOr, props)
  const ElementType = getComponentType(props)
  return <ElementType {...rest} className={classes} data-text={text} ref={ref} />
})
ButtonOr.displayName = 'ButtonOr'
ButtonOr.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
export default ButtonOr
````

## File: elements/Button/index.d.ts/index.d.ts
````typescript
export { default, ButtonProps, StrictButtonProps } from './Button'
````

## File: elements/Button/index.js/index.js
````javascript
export default from './Button'
````

## File: elements/Container/Container.d.ts/Container.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandContent,
  SemanticTEXTALIGNMENTS,
} from '../../generic'
export interface ContainerProps extends StrictContainerProps {
  [key: string]: any
}
export interface StrictContainerProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  fluid?: boolean
  text?: boolean
  textAlign?: SemanticTEXTALIGNMENTS
}
declare const Container: ForwardRefComponent<ContainerProps, HTMLDivElement>
export default Container
````

## File: elements/Container/Container.js/Container.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
} from '../../lib'
const Container = React.forwardRef(function (props, ref) {
  const { children, className, content, fluid, text, textAlign } = props
  const classes = cx(
    'ui',
    getKeyOnly(text, 'text'),
    getKeyOnly(fluid, 'fluid'),
    getTextAlignProp(textAlign),
    'container',
    className,
  )
  const rest = getUnhandledProps(Container, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Container.displayName = 'Container'
Container.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  fluid: PropTypes.bool,
  text: PropTypes.bool,
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
}
export default Container
````

## File: elements/Container/index.d.ts/index.d.ts
````typescript
export { default, ContainerProps, StrictContainerProps } from './Container'
````

## File: elements/Container/index.js/index.js
````javascript
export default from './Container'
````

## File: elements/Divider/Divider.d.ts/Divider.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface DividerProps extends StrictDividerProps {
  [key: string]: any
}
export interface StrictDividerProps {
  as?: any
  children?: React.ReactNode
  className?: string
  clearing?: boolean
  content?: SemanticShorthandContent
  fitted?: boolean
  hidden?: boolean
  horizontal?: boolean
  inverted?: boolean
  section?: boolean
  vertical?: boolean
}
declare const Divider: ForwardRefComponent<DividerProps, HTMLDivElement>
export default Divider
````

## File: elements/Divider/Divider.js/Divider.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const Divider = React.forwardRef(function (props, ref) {
  const {
    children,
    className,
    clearing,
    content,
    fitted,
    hidden,
    horizontal,
    inverted,
    section,
    vertical,
  } = props
  const classes = cx(
    'ui',
    getKeyOnly(clearing, 'clearing'),
    getKeyOnly(fitted, 'fitted'),
    getKeyOnly(hidden, 'hidden'),
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(section, 'section'),
    getKeyOnly(vertical, 'vertical'),
    'divider',
    className,
  )
  const rest = getUnhandledProps(Divider, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Divider.displayName = 'Divider'
Divider.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  clearing: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  fitted: PropTypes.bool,
  hidden: PropTypes.bool,
  horizontal: PropTypes.bool,
  inverted: PropTypes.bool,
  section: PropTypes.bool,
  vertical: PropTypes.bool,
}
export default Divider
````

## File: elements/Divider/index.d.ts/index.d.ts
````typescript
export { default, DividerProps, StrictDividerProps } from './Divider'
````

## File: elements/Divider/index.js/index.js
````javascript
export default from './Divider'
````

## File: elements/Flag/Flag.d.ts/Flag.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export type FlagNameValues =
  | 'ad'
  | 'andorra'
  | 'ae'
  | 'united arab emirates'
  | 'uae'
  | 'af'
  | 'afghanistan'
  | 'ag'
  | 'antigua'
  | 'ai'
  | 'anguilla'
  | 'al'
  | 'albania'
  | 'am'
  | 'armenia'
  | 'an'
  | 'netherlands antilles'
  | 'ao'
  | 'angola'
  | 'ar'
  | 'argentina'
  | 'as'
  | 'american samoa'
  | 'at'
  | 'austria'
  | 'au'
  | 'australia'
  | 'aw'
  | 'aruba'
  | 'ax'
  | 'aland islands'
  | 'az'
  | 'azerbaijan'
  | 'ba'
  | 'bosnia'
  | 'bb'
  | 'barbados'
  | 'bd'
  | 'bangladesh'
  | 'be'
  | 'belgium'
  | 'bf'
  | 'burkina faso'
  | 'bg'
  | 'bulgaria'
  | 'bh'
  | 'bahrain'
  | 'bi'
  | 'burundi'
  | 'bj'
  | 'benin'
  | 'bm'
  | 'bermuda'
  | 'bn'
  | 'brunei'
  | 'bo'
  | 'bolivia'
  | 'br'
  | 'brazil'
  | 'bs'
  | 'bahamas'
  | 'bt'
  | 'bhutan'
  | 'bv'
  | 'bouvet island'
  | 'bw'
  | 'botswana'
  | 'by'
  | 'belarus'
  | 'bz'
  | 'belize'
  | 'ca'
  | 'canada'
  | 'cc'
  | 'cocos islands'
  | 'cd'
  | 'congo'
  | 'cf'
  | 'central african republic'
  | 'cg'
  | 'congo brazzaville'
  | 'ch'
  | 'switzerland'
  | 'ci'
  | 'cote divoire'
  | 'ck'
  | 'cook islands'
  | 'cl'
  | 'chile'
  | 'cm'
  | 'cameroon'
  | 'cn'
  | 'china'
  | 'co'
  | 'colombia'
  | 'cr'
  | 'costa rica'
  | 'cs'
  | 'cu'
  | 'cuba'
  | 'cv'
  | 'cape verde'
  | 'cx'
  | 'christmas island'
  | 'cy'
  | 'cyprus'
  | 'cz'
  | 'czech republic'
  | 'de'
  | 'germany'
  | 'dj'
  | 'djibouti'
  | 'dk'
  | 'denmark'
  | 'dm'
  | 'dominica'
  | 'do'
  | 'dominican republic'
  | 'dz'
  | 'algeria'
  | 'ec'
  | 'ecuador'
  | 'england'
  | 'gb eng'
  | 'ee'
  | 'estonia'
  | 'eg'
  | 'egypt'
  | 'eh'
  | 'western sahara'
  | 'er'
  | 'eritrea'
  | 'es'
  | 'spain'
  | 'et'
  | 'ethiopia'
  | 'eu'
  | 'european union'
  | 'fi'
  | 'finland'
  | 'fj'
  | 'fiji'
  | 'fk'
  | 'falkland islands'
  | 'fm'
  | 'micronesia'
  | 'fo'
  | 'faroe islands'
  | 'fr'
  | 'france'
  | 'ga'
  | 'gabon'
  | 'gb'
  | 'uk'
  | 'united kingdom'
  | 'gd'
  | 'grenada'
  | 'ge'
  | 'georgia'
  | 'gf'
  | 'french guiana'
  | 'gh'
  | 'ghana'
  | 'gi'
  | 'gibraltar'
  | 'gl'
  | 'greenland'
  | 'gm'
  | 'gambia'
  | 'gn'
  | 'guinea'
  | 'gp'
  | 'guadeloupe'
  | 'gq'
  | 'equatorial guinea'
  | 'gr'
  | 'greece'
  | 'gs'
  | 'sandwich islands'
  | 'gt'
  | 'guatemala'
  | 'gu'
  | 'guam'
  | 'gw'
  | 'guinea-bissau'
  | 'gy'
  | 'guyana'
  | 'hk'
  | 'hong kong'
  | 'hm'
  | 'heard island'
  | 'hn'
  | 'honduras'
  | 'hr'
  | 'croatia'
  | 'ht'
  | 'haiti'
  | 'hu'
  | 'hungary'
  | 'id'
  | 'indonesia'
  | 'ie'
  | 'ireland'
  | 'il'
  | 'israel'
  | 'in'
  | 'india'
  | 'io'
  | 'indian ocean territory'
  | 'iq'
  | 'iraq'
  | 'ir'
  | 'iran'
  | 'is'
  | 'iceland'
  | 'it'
  | 'italy'
  | 'jm'
  | 'jamaica'
  | 'jo'
  | 'jordan'
  | 'jp'
  | 'japan'
  | 'ke'
  | 'kenya'
  | 'kg'
  | 'kyrgyzstan'
  | 'kh'
  | 'cambodia'
  | 'ki'
  | 'kiribati'
  | 'km'
  | 'comoros'
  | 'kn'
  | 'saint kitts and nevis'
  | 'kp'
  | 'north korea'
  | 'kr'
  | 'south korea'
  | 'kw'
  | 'kuwait'
  | 'ky'
  | 'cayman islands'
  | 'kz'
  | 'kazakhstan'
  | 'la'
  | 'laos'
  | 'lb'
  | 'lebanon'
  | 'lc'
  | 'saint lucia'
  | 'li'
  | 'liechtenstein'
  | 'lk'
  | 'sri lanka'
  | 'lr'
  | 'liberia'
  | 'ls'
  | 'lesotho'
  | 'lt'
  | 'lithuania'
  | 'lu'
  | 'luxembourg'
  | 'lv'
  | 'latvia'
  | 'ly'
  | 'libya'
  | 'ma'
  | 'morocco'
  | 'mc'
  | 'monaco'
  | 'md'
  | 'moldova'
  | 'me'
  | 'montenegro'
  | 'mg'
  | 'madagascar'
  | 'mh'
  | 'marshall islands'
  | 'mk'
  | 'macedonia'
  | 'ml'
  | 'mali'
  | 'mm'
  | 'myanmar'
  | 'burma'
  | 'mn'
  | 'mongolia'
  | 'mo'
  | 'macau'
  | 'mp'
  | 'northern mariana islands'
  | 'mq'
  | 'martinique'
  | 'mr'
  | 'mauritania'
  | 'ms'
  | 'montserrat'
  | 'mt'
  | 'malta'
  | 'mu'
  | 'mauritius'
  | 'mv'
  | 'maldives'
  | 'mw'
  | 'malawi'
  | 'mx'
  | 'mexico'
  | 'my'
  | 'malaysia'
  | 'mz'
  | 'mozambique'
  | 'na'
  | 'namibia'
  | 'nc'
  | 'new caledonia'
  | 'ne'
  | 'niger'
  | 'nf'
  | 'norfolk island'
  | 'ng'
  | 'nigeria'
  | 'ni'
  | 'nicaragua'
  | 'nl'
  | 'netherlands'
  | 'no'
  | 'norway'
  | 'np'
  | 'nepal'
  | 'nr'
  | 'nauru'
  | 'nu'
  | 'niue'
  | 'nz'
  | 'new zealand'
  | 'om'
  | 'oman'
  | 'pa'
  | 'panama'
  | 'pe'
  | 'peru'
  | 'pf'
  | 'french polynesia'
  | 'pg'
  | 'new guinea'
  | 'ph'
  | 'philippines'
  | 'pk'
  | 'pakistan'
  | 'pl'
  | 'poland'
  | 'pm'
  | 'saint pierre'
  | 'pn'
  | 'pitcairn islands'
  | 'pr'
  | 'puerto rico'
  | 'ps'
  | 'palestine'
  | 'pt'
  | 'portugal'
  | 'pw'
  | 'palau'
  | 'py'
  | 'paraguay'
  | 'qa'
  | 'qatar'
  | 're'
  | 'reunion'
  | 'ro'
  | 'romania'
  | 'rs'
  | 'serbia'
  | 'ru'
  | 'russia'
  | 'rw'
  | 'rwanda'
  | 'sa'
  | 'saudi arabia'
  | 'sb'
  | 'solomon islands'
  | 'sc'
  | 'seychelles'
  | 'gb sct'
  | 'scotland'
  | 'sd'
  | 'sudan'
  | 'se'
  | 'sweden'
  | 'sg'
  | 'singapore'
  | 'sh'
  | 'saint helena'
  | 'si'
  | 'slovenia'
  | 'sj'
  | 'svalbard'
  | 'jan mayen'
  | 'sk'
  | 'slovakia'
  | 'sl'
  | 'sierra leone'
  | 'sm'
  | 'san marino'
  | 'sn'
  | 'senegal'
  | 'so'
  | 'somalia'
  | 'sr'
  | 'suriname'
  | 'st'
  | 'sao tome'
  | 'sv'
  | 'el salvador'
  | 'sy'
  | 'syria'
  | 'sz'
  | 'swaziland'
  | 'tc'
  | 'caicos islands'
  | 'td'
  | 'chad'
  | 'tf'
  | 'french territories'
  | 'tg'
  | 'togo'
  | 'th'
  | 'thailand'
  | 'tj'
  | 'tajikistan'
  | 'tk'
  | 'tokelau'
  | 'tl'
  | 'timorleste'
  | 'tm'
  | 'turkmenistan'
  | 'tn'
  | 'tunisia'
  | 'to'
  | 'tonga'
  | 'tr'
  | 'turkey'
  | 'tt'
  | 'trinidad'
  | 'tv'
  | 'tuvalu'
  | 'tw'
  | 'taiwan'
  | 'tz'
  | 'tanzania'
  | 'ua'
  | 'ukraine'
  | 'ug'
  | 'uganda'
  | 'um'
  | 'us minor islands'
  | 'us'
  | 'america'
  | 'united states'
  | 'uy'
  | 'uruguay'
  | 'uz'
  | 'uzbekistan'
  | 'va'
  | 'vatican city'
  | 'vc'
  | 'saint vincent'
  | 've'
  | 'venezuela'
  | 'vg'
  | 'british virgin islands'
  | 'vi'
  | 'us virgin islands'
  | 'vn'
  | 'vietnam'
  | 'vu'
  | 'vanuatu'
  | 'gb wls'
  | 'wales'
  | 'wf'
  | 'wallis and futuna'
  | 'ws'
  | 'samoa'
  | 'ye'
  | 'yemen'
  | 'yt'
  | 'mayotte'
  | 'za'
  | 'south africa'
  | 'zm'
  | 'zambia'
  | 'zw'
  | 'zimbabwe'
export interface FlagProps extends StrictFlagProps {
  [key: string]: any
}
export interface StrictFlagProps {
  as?: any
  className?: string
  name: FlagNameValues
}
declare const Flag: ForwardRefComponent<FlagProps, HTMLElement>
export default Flag
````

## File: elements/Flag/Flag.js/Flag.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
export const names = [
  'ad',
  'andorra',
  'ae',
  'united arab emirates',
  'uae',
  'af',
  'afghanistan',
  'ag',
  'antigua',
  'ai',
  'anguilla',
  'al',
  'albania',
  'am',
  'armenia',
  'an',
  'netherlands antilles',
  'ao',
  'angola',
  'ar',
  'argentina',
  'as',
  'american samoa',
  'at',
  'austria',
  'au',
  'australia',
  'aw',
  'aruba',
  'ax',
  'aland islands',
  'az',
  'azerbaijan',
  'ba',
  'bosnia',
  'bb',
  'barbados',
  'bd',
  'bangladesh',
  'be',
  'belgium',
  'bf',
  'burkina faso',
  'bg',
  'bulgaria',
  'bh',
  'bahrain',
  'bi',
  'burundi',
  'bj',
  'benin',
  'bm',
  'bermuda',
  'bn',
  'brunei',
  'bo',
  'bolivia',
  'br',
  'brazil',
  'bs',
  'bahamas',
  'bt',
  'bhutan',
  'bv',
  'bouvet island',
  'bw',
  'botswana',
  'by',
  'belarus',
  'bz',
  'belize',
  'ca',
  'canada',
  'cc',
  'cocos islands',
  'cd',
  'congo',
  'cf',
  'central african republic',
  'cg',
  'congo brazzaville',
  'ch',
  'switzerland',
  'ci',
  'cote divoire',
  'ck',
  'cook islands',
  'cl',
  'chile',
  'cm',
  'cameroon',
  'cn',
  'china',
  'co',
  'colombia',
  'cr',
  'costa rica',
  'cs',
  'cu',
  'cuba',
  'cv',
  'cape verde',
  'cx',
  'christmas island',
  'cy',
  'cyprus',
  'cz',
  'czech republic',
  'de',
  'germany',
  'dj',
  'djibouti',
  'dk',
  'denmark',
  'dm',
  'dominica',
  'do',
  'dominican republic',
  'dz',
  'algeria',
  'ec',
  'ecuador',
  'england',
  'gb eng',
  'ee',
  'estonia',
  'eg',
  'egypt',
  'eh',
  'western sahara',
  'er',
  'eritrea',
  'es',
  'spain',
  'et',
  'ethiopia',
  'eu',
  'european union',
  'fi',
  'finland',
  'fj',
  'fiji',
  'fk',
  'falkland islands',
  'fm',
  'micronesia',
  'fo',
  'faroe islands',
  'fr',
  'france',
  'ga',
  'gabon',
  'gb',
  'uk',
  'united kingdom',
  'gd',
  'grenada',
  'ge',
  'georgia',
  'gf',
  'french guiana',
  'gh',
  'ghana',
  'gi',
  'gibraltar',
  'gl',
  'greenland',
  'gm',
  'gambia',
  'gn',
  'guinea',
  'gp',
  'guadeloupe',
  'gq',
  'equatorial guinea',
  'gr',
  'greece',
  'gs',
  'sandwich islands',
  'gt',
  'guatemala',
  'gu',
  'guam',
  'gw',
  'guinea-bissau',
  'gy',
  'guyana',
  'hk',
  'hong kong',
  'hm',
  'heard island',
  'hn',
  'honduras',
  'hr',
  'croatia',
  'ht',
  'haiti',
  'hu',
  'hungary',
  'id',
  'indonesia',
  'ie',
  'ireland',
  'il',
  'israel',
  'in',
  'india',
  'io',
  'indian ocean territory',
  'iq',
  'iraq',
  'ir',
  'iran',
  'is',
  'iceland',
  'it',
  'italy',
  'jm',
  'jamaica',
  'jo',
  'jordan',
  'jp',
  'japan',
  'ke',
  'kenya',
  'kg',
  'kyrgyzstan',
  'kh',
  'cambodia',
  'ki',
  'kiribati',
  'km',
  'comoros',
  'kn',
  'saint kitts and nevis',
  'kp',
  'north korea',
  'kr',
  'south korea',
  'kw',
  'kuwait',
  'ky',
  'cayman islands',
  'kz',
  'kazakhstan',
  'la',
  'laos',
  'lb',
  'lebanon',
  'lc',
  'saint lucia',
  'li',
  'liechtenstein',
  'lk',
  'sri lanka',
  'lr',
  'liberia',
  'ls',
  'lesotho',
  'lt',
  'lithuania',
  'lu',
  'luxembourg',
  'lv',
  'latvia',
  'ly',
  'libya',
  'ma',
  'morocco',
  'mc',
  'monaco',
  'md',
  'moldova',
  'me',
  'montenegro',
  'mg',
  'madagascar',
  'mh',
  'marshall islands',
  'mk',
  'macedonia',
  'ml',
  'mali',
  'mm',
  'myanmar',
  'burma',
  'mn',
  'mongolia',
  'mo',
  'macau',
  'mp',
  'northern mariana islands',
  'mq',
  'martinique',
  'mr',
  'mauritania',
  'ms',
  'montserrat',
  'mt',
  'malta',
  'mu',
  'mauritius',
  'mv',
  'maldives',
  'mw',
  'malawi',
  'mx',
  'mexico',
  'my',
  'malaysia',
  'mz',
  'mozambique',
  'na',
  'namibia',
  'nc',
  'new caledonia',
  'ne',
  'niger',
  'nf',
  'norfolk island',
  'ng',
  'nigeria',
  'ni',
  'nicaragua',
  'nl',
  'netherlands',
  'no',
  'norway',
  'np',
  'nepal',
  'nr',
  'nauru',
  'nu',
  'niue',
  'nz',
  'new zealand',
  'om',
  'oman',
  'pa',
  'panama',
  'pe',
  'peru',
  'pf',
  'french polynesia',
  'pg',
  'new guinea',
  'ph',
  'philippines',
  'pk',
  'pakistan',
  'pl',
  'poland',
  'pm',
  'saint pierre',
  'pn',
  'pitcairn islands',
  'pr',
  'puerto rico',
  'ps',
  'palestine',
  'pt',
  'portugal',
  'pw',
  'palau',
  'py',
  'paraguay',
  'qa',
  'qatar',
  're',
  'reunion',
  'ro',
  'romania',
  'rs',
  'serbia',
  'ru',
  'russia',
  'rw',
  'rwanda',
  'sa',
  'saudi arabia',
  'sb',
  'solomon islands',
  'sc',
  'seychelles',
  'gb sct',
  'scotland',
  'sd',
  'sudan',
  'se',
  'sweden',
  'sg',
  'singapore',
  'sh',
  'saint helena',
  'si',
  'slovenia',
  'sj',
  'svalbard',
  'jan mayen',
  'sk',
  'slovakia',
  'sl',
  'sierra leone',
  'sm',
  'san marino',
  'sn',
  'senegal',
  'so',
  'somalia',
  'sr',
  'suriname',
  'st',
  'sao tome',
  'sv',
  'el salvador',
  'sy',
  'syria',
  'sz',
  'swaziland',
  'tc',
  'caicos islands',
  'td',
  'chad',
  'tf',
  'french territories',
  'tg',
  'togo',
  'th',
  'thailand',
  'tj',
  'tajikistan',
  'tk',
  'tokelau',
  'tl',
  'timorleste',
  'tm',
  'turkmenistan',
  'tn',
  'tunisia',
  'to',
  'tonga',
  'tr',
  'turkey',
  'tt',
  'trinidad',
  'tv',
  'tuvalu',
  'tw',
  'taiwan',
  'tz',
  'tanzania',
  'ua',
  'ukraine',
  'ug',
  'uganda',
  'um',
  'us minor islands',
  'us',
  'america',
  'united states',
  'uy',
  'uruguay',
  'uz',
  'uzbekistan',
  'va',
  'vatican city',
  'vc',
  'saint vincent',
  've',
  'venezuela',
  'vg',
  'british virgin islands',
  'vi',
  'us virgin islands',
  'vn',
  'vietnam',
  'vu',
  'vanuatu',
  'gb wls',
  'wales',
  'wf',
  'wallis and futuna',
  'ws',
  'samoa',
  'ye',
  'yemen',
  'yt',
  'mayotte',
  'za',
  'south africa',
  'zm',
  'zambia',
  'zw',
  'zimbabwe',
]
const Flag = React.forwardRef(function (props, ref) {
  const { className, name } = props
  const classes = cx(name, 'flag', className)
  const rest = getUnhandledProps(Flag, props)
  const ElementType = getComponentType(props, { defaultAs: 'i' })
  return <ElementType {...rest} className={classes} ref={ref} />
})
Flag.displayName = 'Flag'
Flag.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  name: customPropTypes.suggest(names),
}
const MemoFlag = React.memo(Flag)
MemoFlag.create = createShorthandFactory(MemoFlag, (value) => ({ name: value }))
export default MemoFlag
````

## File: elements/Flag/index.d.ts/index.d.ts
````typescript
export { default, FlagNameValues, FlagProps, StrictFlagProps } from './Flag'
````

## File: elements/Flag/index.js/index.js
````javascript
export default from './Flag'
````

## File: elements/Header/Header.d.ts/Header.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticTEXTALIGNMENTS,
} from '../../generic'
import HeaderContent from './HeaderContent'
import HeaderSubheader from './HeaderSubheader'
export interface HeaderProps extends StrictHeaderProps {
  [key: string]: any
}
export interface StrictHeaderProps {
  as?: any
  attached?: boolean | 'top' | 'bottom'
  block?: boolean
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  content?: React.ReactNode
  disabled?: boolean
  dividing?: boolean
  floated?: SemanticFLOATS
  icon?: any
  image?: any
  inverted?: boolean
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge'
  sub?: boolean
  subheader?: any
  textAlign?: SemanticTEXTALIGNMENTS
}
declare const Header: ForwardRefComponent<HeaderProps, HTMLDivElement> & {
  Content: typeof HeaderContent
  Subheader: typeof HeaderSubheader
}
export default Header
````

## File: elements/Header/Header.js/Header.js
````javascript
import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getValueAndKey,
  getTextAlignProp,
  getKeyOrValueAndKey,
  getKeyOnly,
} from '../../lib'
import Icon from '../Icon'
import Image from '../Image'
import HeaderSubheader from './HeaderSubheader'
import HeaderContent from './HeaderContent'
const Header = React.forwardRef(function (props, ref) {
  const {
    attached,
    block,
    children,
    className,
    color,
    content,
    disabled,
    dividing,
    floated,
    icon,
    image,
    inverted,
    size,
    sub,
    subheader,
    textAlign,
  } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(block, 'block'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(dividing, 'dividing'),
    getValueAndKey(floated, 'floated'),
    getKeyOnly(icon === true, 'icon'),
    getKeyOnly(image === true, 'image'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(sub, 'sub'),
    getKeyOrValueAndKey(attached, 'attached'),
    getTextAlignProp(textAlign),
    'header',
    className,
  )
  const rest = getUnhandledProps(Header, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const iconElement = Icon.create(icon, { autoGenerateKey: false })
  const imageElement = Image.create(image, { autoGenerateKey: false })
  const subheaderElement = HeaderSubheader.create(subheader, { autoGenerateKey: false })
  if (iconElement || imageElement) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {iconElement || imageElement}
        {(content || subheaderElement) && (
          <HeaderContent>
            {content}
            {subheaderElement}
          </HeaderContent>
        )}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {content}
      {subheaderElement}
    </ElementType>
  )
})
Header.displayName = 'Header'
Header.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  dividing: PropTypes.bool,
  floated: PropTypes.oneOf(SUI.FLOATS),
  icon: customPropTypes.every([
    customPropTypes.disallow(['image']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  ]),
  image: customPropTypes.every([
    customPropTypes.disallow(['icon']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  ]),
  inverted: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'big', 'massive', 'mini')),
  sub: PropTypes.bool,
  subheader: customPropTypes.itemShorthand,
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),
}
Header.Content = HeaderContent
Header.Subheader = HeaderSubheader
export default Header
````

## File: elements/Header/HeaderContent.d.ts/HeaderContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface HeaderContentProps extends StrictHeaderContentProps {
  [key: string]: any
}
export interface StrictHeaderContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const HeaderContent: ForwardRefComponent<HeaderContentProps, HTMLDivElement>
export default HeaderContent
````

## File: elements/Header/HeaderContent.js/HeaderContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const HeaderContent = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(HeaderContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
HeaderContent.displayName = 'HeaderContent'
HeaderContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default HeaderContent
````

## File: elements/Header/HeaderSubheader.d.ts/HeaderSubheader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface HeaderSubheaderProps extends StrictHeaderSubheaderProps {
  [key: string]: any
}
export interface StrictHeaderSubheaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const HeaderSubheader: ForwardRefComponent<HeaderSubheaderProps, HTMLDivElement>
export default HeaderSubheader
````

## File: elements/Header/HeaderSubheader.js/HeaderSubheader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const HeaderSubheader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('sub header', className)
  const rest = getUnhandledProps(HeaderSubheader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
HeaderSubheader.displayName = 'HeaderSubheader'
HeaderSubheader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
HeaderSubheader.create = createShorthandFactory(HeaderSubheader, (content) => ({ content }))
export default HeaderSubheader
````

## File: elements/Header/index.d.ts/index.d.ts
````typescript
export { default, HeaderProps, StrictHeaderProps } from './Header'
````

## File: elements/Header/index.js/index.js
````javascript
export default from './Header'
````

## File: elements/Icon/Icon.d.ts/Icon.d.ts
````typescript
import { ForwardRefComponent, SemanticCOLORS, SemanticICONS } from '../../generic'
import IconGroup from './IconGroup'
export type IconSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
export type IconCorner = 'bottom right' | 'top right' | 'top left' | 'bottom left'
export interface IconProps extends StrictIconProps {
  [key: string]: any
}
export interface StrictIconProps {
  as?: any
  bordered?: boolean
  circular?: boolean
  className?: string
  color?: SemanticCOLORS
  corner?: boolean | IconCorner
  disabled?: boolean
  fitted?: boolean
  flipped?: 'horizontally' | 'vertically'
  inverted?: boolean
  link?: boolean
  loading?: boolean
  name?: SemanticICONS
  rotated?: 'clockwise' | 'counterclockwise'
  size?: IconSizeProp
  'aria-hidden'?: string
  'aria-label'?: string
}
declare const Icon: ForwardRefComponent<IconProps, HTMLElement> & {
  Group: typeof IconGroup
}
export default Icon
````

## File: elements/Icon/Icon.js/Icon.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  useEventCallback,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
} from '../../lib'
import IconGroup from './IconGroup'
function getAriaProps(props) {
  const ariaOptions = {}
  const { 'aria-label': ariaLabel, 'aria-hidden': ariaHidden } = props
  if (_.isNil(ariaLabel)) {
    ariaOptions['aria-hidden'] = 'true'
  } else {
    ariaOptions['aria-label'] = ariaLabel
  }
  if (!_.isNil(ariaHidden)) {
    ariaOptions['aria-hidden'] = ariaHidden
  }
  return ariaOptions
}
const Icon = React.forwardRef(function (props, ref) {
  const {
    bordered,
    circular,
    className,
    color,
    corner,
    disabled,
    fitted,
    flipped,
    inverted,
    link,
    loading,
    name,
    rotated,
    size,
  } = props
  const classes = cx(
    color,
    name,
    size,
    getKeyOnly(bordered, 'bordered'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(fitted, 'fitted'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(link, 'link'),
    getKeyOnly(loading, 'loading'),
    getKeyOrValueAndKey(corner, 'corner'),
    getValueAndKey(flipped, 'flipped'),
    getValueAndKey(rotated, 'rotated'),
    'icon',
    className,
  )
  const rest = getUnhandledProps(Icon, props)
  const ElementType = getComponentType(props, { defaultAs: 'i' })
  const ariaProps = getAriaProps(props)
  const handleClick = useEventCallback((e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    _.invoke(props, 'onClick', e, props)
  })
  return (
    <ElementType {...rest} {...ariaProps} className={classes} onClick={handleClick} ref={ref} />
  )
})
Icon.displayName = 'Icon'
Icon.propTypes = {
  as: PropTypes.elementType,
  bordered: PropTypes.bool,
  circular: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  corner: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['top left', 'top right', 'bottom left', 'bottom right']),
  ]),
  disabled: PropTypes.bool,
  fitted: PropTypes.bool,
  flipped: PropTypes.oneOf(['horizontally', 'vertically']),
  inverted: PropTypes.bool,
  link: PropTypes.bool,
  loading: PropTypes.bool,
  name: customPropTypes.suggest(SUI.ALL_ICONS_IN_ALL_CONTEXTS),
  rotated: PropTypes.oneOf(['clockwise', 'counterclockwise']),
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  'aria-hidden': PropTypes.string,
  'aria-label': PropTypes.string,
}
const MemoIcon = React.memo(Icon)
MemoIcon.Group = IconGroup
MemoIcon.create = createShorthandFactory(MemoIcon, (value) => ({ name: value }))
export default MemoIcon
````

## File: elements/Icon/IconGroup.d.ts/IconGroup.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import { IconSizeProp } from './Icon'
export interface IconGroupProps extends StrictIconGroupProps {
  [key: string]: any
}
export interface StrictIconGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  size?: IconSizeProp
}
declare const IconGroup: ForwardRefComponent<IconGroupProps, HTMLElement>
export default IconGroup
````

## File: elements/Icon/IconGroup.js/IconGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps, SUI } from '../../lib'
const IconGroup = React.forwardRef(function (props, ref) {
  const { children, className, content, size } = props
  const classes = cx(size, 'icons', className)
  const rest = getUnhandledProps(IconGroup, props)
  const ElementType = getComponentType(props, { defaultAs: 'i' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
IconGroup.displayName = 'IconGroup'
IconGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
}
export default IconGroup
````

## File: elements/Icon/index.d.ts/index.d.ts
````typescript
export { default, IconProps, StrictIconProps } from './Icon'
````

## File: elements/Icon/index.js/index.js
````javascript
export default from './Icon'
````

## File: elements/Image/Image.d.ts/Image.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticSIZES,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import { DimmerProps } from '../../modules/Dimmer'
import { LabelProps } from '../Label'
import ImageGroup from './ImageGroup'
export interface ImageProps extends StrictImageProps {
  [key: string]: any
}
export interface StrictImageProps {
  as?: any
  avatar?: boolean
  bordered?: boolean
  centered?: boolean
  children?: React.ReactNode
  circular?: boolean
  className?: string
  content?: SemanticShorthandContent
  disabled?: boolean
  dimmer?: SemanticShorthandItem<DimmerProps>
  floated?: SemanticFLOATS
  fluid?: boolean
  hidden?: boolean
  href?: string
  inline?: boolean
  label?: SemanticShorthandItem<LabelProps>
  rounded?: boolean
  size?: SemanticSIZES
  spaced?: boolean | 'left' | 'right'
  ui?: boolean
  verticalAlign?: SemanticVERTICALALIGNMENTS
  wrapped?: boolean
}
declare const Image: ForwardRefComponent<ImageProps, HTMLImageElement> & {
  Group: typeof ImageGroup
}
export default Image
````

## File: elements/Image/Image.js/Image.js
````javascript
import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  htmlImageProps,
  partitionHTMLProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getVerticalAlignProp,
} from '../../lib'
import Dimmer from '../../modules/Dimmer'
import Label from '../Label/Label'
import ImageGroup from './ImageGroup'
const Image = React.forwardRef(function (props, ref) {
  const {
    avatar,
    bordered,
    centered,
    children,
    circular,
    className,
    content,
    dimmer,
    disabled,
    floated,
    fluid,
    hidden,
    href,
    inline,
    label,
    rounded,
    size,
    spaced,
    verticalAlign,
    wrapped,
    ui = true,
  } = props
  const classes = cx(
    getKeyOnly(ui, 'ui'),
    size,
    getKeyOnly(avatar, 'avatar'),
    getKeyOnly(bordered, 'bordered'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(centered, 'centered'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(hidden, 'hidden'),
    getKeyOnly(inline, 'inline'),
    getKeyOnly(rounded, 'rounded'),
    getKeyOrValueAndKey(spaced, 'spaced'),
    getValueAndKey(floated, 'floated'),
    getVerticalAlignProp(verticalAlign, 'aligned'),
    'image',
    className,
  )
  const rest = getUnhandledProps(Image, props)
  const [imgTagProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps })
  const ElementType = getComponentType(props, {
    defaultAs: 'img',
    getDefault: () => {
      if (
        !_.isNil(dimmer) ||
        !_.isNil(label) ||
        !_.isNil(wrapped) ||
        !childrenUtils.isNil(children)
      ) {
        return 'div'
      }
    },
  })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  if (ElementType === 'img') {
    return <ElementType {...rootProps} {...imgTagProps} className={classes} ref={ref} />
  }
  return (
    <ElementType {...rootProps} className={classes} href={href}>
      {Dimmer.create(dimmer, { autoGenerateKey: false })}
      {Label.create(label, { autoGenerateKey: false })}
      <img {...imgTagProps} ref={ref} />
    </ElementType>
  )
})
Image.Group = ImageGroup
Image.displayName = 'Image'
Image.propTypes = {
  as: PropTypes.elementType,
  avatar: PropTypes.bool,
  bordered: PropTypes.bool,
  centered: PropTypes.bool,
  children: PropTypes.node,
  circular: PropTypes.bool,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  dimmer: customPropTypes.itemShorthand,
  floated: PropTypes.oneOf(SUI.FLOATS),
  fluid: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['size'])]),
  hidden: PropTypes.bool,
  href: PropTypes.string,
  inline: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(SUI.SIZES),
  spaced: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]),
  ui: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
  wrapped: PropTypes.bool,
}
Image.create = createShorthandFactory(Image, (value) => ({ src: value }))
export default Image
````

## File: elements/Image/ImageGroup.d.ts/ImageGroup.d.ts
````typescript
import * as React from 'react'
import { SemanticSIZES, SemanticShorthandContent, ForwardRefComponent } from '../../generic'
export interface ImageGroupProps extends StrictImageGroupProps {
  [key: string]: any
}
export interface StrictImageGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  size?: SemanticSIZES
}
declare const ImageGroup: ForwardRefComponent<ImageGroupProps, HTMLDivElement>
export default ImageGroup
````

## File: elements/Image/ImageGroup.js/ImageGroup.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps, SUI } from '../../lib'
const ImageGroup = React.forwardRef(function (props, ref) {
  const { children, className, content, size } = props
  const classes = cx('ui', size, className, 'images')
  const rest = getUnhandledProps(ImageGroup, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ImageGroup.displayName = 'ImageGroup'
ImageGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  size: PropTypes.oneOf(SUI.SIZES),
}
export default ImageGroup
````

## File: elements/Image/index.d.ts/index.d.ts
````typescript
export { default, ImageProps, StrictImageProps } from './Image'
````

## File: elements/Image/index.js/index.js
````javascript
export default from './Image'
````

## File: elements/Input/index.d.ts/index.d.ts
````typescript
export { default, InputProps, StrictInputProps, InputOnChangeData } from './Input'
````

## File: elements/Input/index.js/index.js
````javascript
export default from './Input'
````

## File: elements/Input/Input.d.ts/Input.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, HtmlInputrops, SemanticShorthandItem } from '../../generic'
import { LabelProps } from '../Label'
export interface InputProps extends StrictInputProps {
  [key: string]: any
}
export interface StrictInputProps {
  as?: any
  action?: any | boolean
  actionPosition?: 'left'
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  error?: boolean
  fluid?: boolean
  focus?: boolean
  icon?: any | SemanticShorthandItem<InputProps>
  iconPosition?: 'left'
  input?: SemanticShorthandItem<HtmlInputrops>
  inverted?: boolean
  label?: SemanticShorthandItem<LabelProps>
  labelPosition?: 'left' | 'right' | 'left corner' | 'right corner'
  loading?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void
  size?: 'mini' | 'small' | 'large' | 'big' | 'huge' | 'massive'
  tabIndex?: number | string
  transparent?: boolean
  type?: string
}
export interface InputOnChangeData extends InputProps {
  value: string
}
declare const Input: ForwardRefComponent<InputProps, HTMLInputElement>
export default Input
````

## File: elements/Input/Input.js/Input.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createHTMLInput,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  partitionHTMLProps,
  getKeyOnly,
  getValueAndKey,
  setRef,
} from '../../lib'
import Button from '../Button'
import Icon from '../Icon'
import Label from '../Label'
const Input = React.forwardRef(function (props, ref) {
  const {
    action,
    actionPosition,
    children,
    className,
    disabled,
    error,
    fluid,
    focus,
    icon,
    iconPosition,
    input,
    inverted,
    label,
    labelPosition,
    loading,
    size,
    tabIndex,
    transparent,
    type = 'text',
  } = props
  const computeIcon = () => {
    if (!_.isNil(icon)) {
      return icon
    }
    if (loading) {
      return 'spinner'
    }
  }
  const computeTabIndex = () => {
    if (!_.isNil(tabIndex)) {
      return tabIndex
    }
    if (disabled) {
      return -1
    }
  }
  const handleChange = (e) => {
    const newValue = _.get(e, 'target.value')
    _.invoke(props, 'onChange', e, { ...props, value: newValue })
  }
  const partitionProps = () => {
    const unhandledProps = getUnhandledProps(Input, props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandledProps)
    return [
      {
        ...htmlInputProps,
        disabled,
        type,
        tabIndex: computeTabIndex(),
        onChange: handleChange,
        ref,
      },
      rest,
    ]
  }
  const classes = cx(
    'ui',
    size,
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(error, 'error'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(focus, 'focus'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(loading, 'loading'),
    getKeyOnly(transparent, 'transparent'),
    getValueAndKey(actionPosition, 'action') || getKeyOnly(action, 'action'),
    getValueAndKey(iconPosition, 'icon') || getKeyOnly(icon || loading, 'icon'),
    getValueAndKey(labelPosition, 'labeled') || getKeyOnly(label, 'labeled'),
    'input',
    className,
  )
  const ElementType = getComponentType(props)
  const [htmlInputProps, rest] = partitionProps()
  if (!childrenUtils.isNil(children)) {
    const childElements = _.map(React.Children.toArray(children), (child) => {
      if (child.type === 'input') {
        return React.cloneElement(child, {
          ...htmlInputProps,
          ...child.props,
          ref: (c) => {
            setRef(child.ref, c)
            setRef(ref, c)
          },
        })
      }
      return child
    })
    return (
      <ElementType {...rest} className={classes}>
        {childElements}
      </ElementType>
    )
  }
  const actionElement = Button.create(action, { autoGenerateKey: false })
  const labelElement = Label.create(label, {
    defaultProps: {
      className: cx(
        'label',
        _.includes(labelPosition, 'corner') && labelPosition,
      ),
    },
    autoGenerateKey: false,
  })
  return (
    <ElementType {...rest} className={classes}>
      {actionPosition === 'left' && actionElement}
      {labelPosition !== 'right' && labelElement}
      {createHTMLInput(input || type, { defaultProps: htmlInputProps, autoGenerateKey: false })}
      {Icon.create(computeIcon(), { autoGenerateKey: false })}
      {actionPosition !== 'left' && actionElement}
      {labelPosition === 'right' && labelElement}
    </ElementType>
  )
})
Input.displayName = 'Input'
Input.propTypes = {
  as: PropTypes.elementType,
  action: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  actionPosition: PropTypes.oneOf(['left']),
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fluid: PropTypes.bool,
  focus: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  iconPosition: PropTypes.oneOf(['left']),
  input: customPropTypes.itemShorthand,
  inverted: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  labelPosition: PropTypes.oneOf(['left', 'right', 'left corner', 'right corner']),
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  transparent: PropTypes.bool,
  type: PropTypes.string,
}
Input.create = createShorthandFactory(Input, (type) => ({ type }))
export default Input
````

## File: elements/Label/index.d.ts/index.d.ts
````typescript
export { default, LabelProps, StrictLabelProps } from './Label'
````

## File: elements/Label/index.js/index.js
````javascript
export default from './Label'
````

## File: elements/Label/Label.d.ts/Label.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticSIZES,
} from '../../generic'
import { IconProps } from '../Icon'
import LabelDetail, { LabelDetailProps } from './LabelDetail'
import LabelGroup from './LabelGroup'
export interface LabelProps extends StrictLabelProps {
  [key: string]: any
}
export interface StrictLabelProps {
  as?: any
  active?: boolean
  attached?: 'top' | 'bottom' | 'top right' | 'top left' | 'bottom left' | 'bottom right'
  basic?: boolean
  children?: React.ReactNode
  circular?: boolean
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  corner?: boolean | 'left' | 'right'
  detail?: SemanticShorthandItem<LabelDetailProps>
  empty?: any
  floating?: boolean
  horizontal?: boolean
  icon?: SemanticShorthandItem<IconProps>
  image?: any
  onClick?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void
  onRemove?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void
  pointing?: boolean | 'above' | 'below' | 'left' | 'right'
  prompt?: boolean
  removeIcon?: SemanticShorthandItem<IconProps>
  ribbon?: boolean | 'right'
  size?: SemanticSIZES
  tag?: boolean
}
declare const Label: ForwardRefComponent<LabelProps, HTMLDivElement> & {
  Detail: typeof LabelDetail
  Group: typeof LabelGroup
}
export default Label
````

## File: elements/Label/Label.js/Label.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  useEventCallback,
} from '../../lib'
import Icon from '../Icon/Icon'
import Image from '../Image/Image'
import LabelDetail from './LabelDetail'
import LabelGroup from './LabelGroup'
const Label = React.forwardRef(function (props, ref) {
  const {
    active,
    attached,
    basic,
    children,
    circular,
    className,
    color,
    content,
    corner,
    detail,
    empty,
    floating,
    horizontal,
    icon,
    image,
    onRemove,
    pointing,
    prompt,
    removeIcon,
    ribbon,
    size,
    tag,
  } = props
  const pointingClass =
    (pointing === true && 'pointing') ||
    ((pointing === 'left' || pointing === 'right') && `${pointing} pointing`) ||
    ((pointing === 'above' || pointing === 'below') && `pointing ${pointing}`)
  const classes = cx(
    'ui',
    color,
    pointingClass,
    size,
    getKeyOnly(active, 'active'),
    getKeyOnly(basic, 'basic'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(empty, 'empty'),
    getKeyOnly(floating, 'floating'),
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(image === true, 'image'),
    getKeyOnly(prompt, 'prompt'),
    getKeyOnly(tag, 'tag'),
    getKeyOrValueAndKey(corner, 'corner'),
    getKeyOrValueAndKey(ribbon, 'ribbon'),
    getValueAndKey(attached, 'attached'),
    'label',
    className,
  )
  const rest = getUnhandledProps(Label, props)
  const ElementType = getComponentType(props)
  const handleClick = useEventCallback((e) => {
    _.invoke(props, 'onClick', e, props)
  })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const removeIconShorthand = _.isUndefined(removeIcon) ? 'delete' : removeIcon
  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {typeof image !== 'boolean' && Image.create(image, { autoGenerateKey: false })}
      {content}
      {LabelDetail.create(detail, { autoGenerateKey: false })}
      {onRemove &&
        Icon.create(removeIconShorthand, {
          autoGenerateKey: false,
          overrideProps: (predefinedProps) => ({
            onClick: (e) => {
              _.invoke(predefinedProps, 'onClick', e)
              _.invoke(props, 'onRemove', e, props)
            },
          }),
        })}
    </ElementType>
  )
})
Label.displayName = 'Label'
Label.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  attached: PropTypes.oneOf([
    'top',
    'bottom',
    'top right',
    'top left',
    'bottom left',
    'bottom right',
  ]),
  basic: PropTypes.bool,
  children: PropTypes.node,
  circular: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]),
  detail: customPropTypes.itemShorthand,
  empty: customPropTypes.every([PropTypes.bool, customPropTypes.demand(['circular'])]),
  floating: PropTypes.bool,
  horizontal: PropTypes.bool,
  icon: customPropTypes.itemShorthand,
  image: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),
  onClick: PropTypes.func,
  onRemove: PropTypes.func,
  pointing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['above', 'below', 'left', 'right']),
  ]),
  prompt: PropTypes.bool,
  removeIcon: customPropTypes.itemShorthand,
  ribbon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),
  size: PropTypes.oneOf(SUI.SIZES),
  tag: PropTypes.bool,
}
Label.Detail = LabelDetail
Label.Group = LabelGroup
Label.create = createShorthandFactory(Label, (value) => ({ content: value }))
export default Label
````

## File: elements/Label/LabelDetail.d.ts/LabelDetail.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface LabelDetailProps extends StrictLabelDetailProps {
  [key: string]: any
}
export interface StrictLabelDetailProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const LabelDetail: ForwardRefComponent<LabelDetailProps, HTMLDivElement>
export default LabelDetail
````

## File: elements/Label/LabelDetail.js/LabelDetail.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const LabelDetail = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('detail', className)
  const rest = getUnhandledProps(LabelDetail, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
LabelDetail.displayName = 'LabelDetail'
LabelDetail.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
LabelDetail.create = createShorthandFactory(LabelDetail, (val) => ({ content: val }))
export default LabelDetail
````

## File: elements/Label/LabelGroup.d.ts/LabelGroup.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticSIZES,
} from '../../generic'
export interface LabelGroupProps extends StrictLabelGroupProps {
  [key: string]: any
}
export interface StrictLabelGroupProps {
  as?: any
  children?: React.ReactNode
  circular?: boolean
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  size?: SemanticSIZES
  tag?: boolean
}
declare const LabelGroup: ForwardRefComponent<LabelGroupProps, HTMLDivElement>
export default LabelGroup
````

## File: elements/Label/LabelGroup.js/LabelGroup.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
} from '../../lib'
const LabelGroup = React.forwardRef(function (props, ref) {
  const { children, circular, className, color, content, size, tag } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(circular, 'circular'),
    getKeyOnly(tag, 'tag'),
    'labels',
    className,
  )
  const rest = getUnhandledProps(LabelGroup, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
LabelGroup.displayName = 'LabelGroup'
LabelGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  circular: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  size: PropTypes.oneOf(SUI.SIZES),
  tag: PropTypes.bool,
}
export default LabelGroup
````

## File: elements/List/index.d.ts/index.d.ts
````typescript
export { default, ListProps, StrictListProps } from './List'
````

## File: elements/List/index.js/index.js
````javascript
export default from './List'
````

## File: elements/List/List.d.ts/List.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticFLOATS,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticSIZES,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import ListContent from './ListContent'
import ListDescription from './ListDescription'
import ListHeader from './ListHeader'
import ListIcon from './ListIcon'
import ListItem, { ListItemProps } from './ListItem'
import ListList from './ListList'
export interface ListProps extends StrictListProps {
  [key: string]: any
}
export interface StrictListProps {
  as?: any
  animated?: boolean
  bulleted?: boolean
  celled?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  divided?: boolean
  floated?: SemanticFLOATS
  horizontal?: boolean
  inverted?: boolean
  items?: SemanticShorthandCollection<ListItemProps>
  link?: boolean
  onItemClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: ListItemProps) => void
  ordered?: boolean
  relaxed?: boolean | 'very'
  selection?: boolean
  size?: SemanticSIZES
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const List: ForwardRefComponent<ListProps, HTMLDivElement> & {
  Content: typeof ListContent
  Description: typeof ListDescription
  Header: typeof ListHeader
  Icon: typeof ListIcon
  Item: typeof ListItem
  List: typeof ListList
}
export default List
````

## File: elements/List/List.js/List.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getVerticalAlignProp,
} from '../../lib'
import ListContent from './ListContent'
import ListDescription from './ListDescription'
import ListHeader from './ListHeader'
import ListIcon from './ListIcon'
import ListItem from './ListItem'
import ListList from './ListList'
const List = React.forwardRef(function (props, ref) {
  const {
    animated,
    bulleted,
    celled,
    children,
    className,
    content,
    divided,
    floated,
    horizontal,
    inverted,
    items,
    link,
    ordered,
    relaxed,
    selection,
    size,
    verticalAlign,
  } = props
  const classes = cx(
    'ui',
    size,
    getKeyOnly(animated, 'animated'),
    getKeyOnly(bulleted, 'bulleted'),
    getKeyOnly(celled, 'celled'),
    getKeyOnly(divided, 'divided'),
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(link, 'link'),
    getKeyOnly(ordered, 'ordered'),
    getKeyOnly(selection, 'selection'),
    getKeyOrValueAndKey(relaxed, 'relaxed'),
    getValueAndKey(floated, 'floated'),
    getVerticalAlignProp(verticalAlign),
    'list',
    className,
  )
  const rest = getUnhandledProps(List, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType role='list' {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType role='list' {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType role='list' {...rest} className={classes} ref={ref}>
      {_.map(items, (item) =>
        ListItem.create(item, {
          overrideProps: (predefinedProps) => ({
            onClick: (e, itemProps) => {
              _.invoke(predefinedProps, 'onClick', e, itemProps)
              _.invoke(props, 'onItemClick', e, itemProps)
            },
          }),
        }),
      )}
    </ElementType>
  )
})
List.displayName = 'List'
List.propTypes = {
  as: PropTypes.elementType,
  animated: PropTypes.bool,
  bulleted: PropTypes.bool,
  celled: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  divided: PropTypes.bool,
  floated: PropTypes.oneOf(SUI.FLOATS),
  horizontal: PropTypes.bool,
  inverted: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  link: PropTypes.bool,
  onItemClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
  ordered: PropTypes.bool,
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  selection: PropTypes.bool,
  size: PropTypes.oneOf(SUI.SIZES),
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
List.Content = ListContent
List.Description = ListDescription
List.Header = ListHeader
List.Icon = ListIcon
List.Item = ListItem
List.List = ListList
export default List
````

## File: elements/List/ListContent.d.ts/ListContent.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import { ListDescriptionProps } from './ListDescription'
import { ListHeaderProps } from './ListHeader'
export interface ListContentProps extends StrictListContentProps {
  [key: string]: any
}
export interface StrictListContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<ListDescriptionProps>
  floated?: SemanticFLOATS
  header?: SemanticShorthandItem<ListHeaderProps>
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const ListContent: ForwardRefComponent<ListContentProps, HTMLDivElement>
export default ListContent
````

## File: elements/List/ListContent.js/ListContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getValueAndKey,
  getVerticalAlignProp,
} from '../../lib'
import ListDescription from './ListDescription'
import ListHeader from './ListHeader'
const ListContent = React.forwardRef(function (props, ref) {
  const { children, className, content, description, floated, header, verticalAlign } = props
  const classes = cx(
    getValueAndKey(floated, 'floated'),
    getVerticalAlignProp(verticalAlign),
    'content',
    className,
  )
  const rest = getUnhandledProps(ListContent, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {ListHeader.create(header)}
      {ListDescription.create(description)}
      {content}
    </ElementType>
  )
})
ListContent.displayName = 'ListContent'
ListContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  floated: PropTypes.oneOf(SUI.FLOATS),
  header: customPropTypes.itemShorthand,
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
ListContent.create = createShorthandFactory(ListContent, (content) => ({ content }))
export default ListContent
````

## File: elements/List/ListDescription.d.ts/ListDescription.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ListDescriptionProps extends StrictListDescriptionProps {
  [key: string]: any
}
export interface StrictListDescriptionProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ListDescription: ForwardRefComponent<ListDescriptionProps, HTMLDivElement>
export default ListDescription
````

## File: elements/List/ListDescription.js/ListDescription.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ListDescription = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx(className, 'description')
  const rest = getUnhandledProps(ListDescription, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ListDescription.displayName = 'ListDescription'
ListDescription.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ListDescription.create = createShorthandFactory(ListDescription, (content) => ({ content }))
export default ListDescription
````

## File: elements/List/ListHeader.d.ts/ListHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ListHeaderProps extends StrictListHeaderProps {
  [key: string]: any
}
export interface StrictListHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ListHeader: ForwardRefComponent<ListHeaderProps, HTMLDivElement>
export default ListHeader
````

## File: elements/List/ListHeader.js/ListHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ListHeader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(ListHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ListHeader.displayName = 'ListHeader'
ListHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ListHeader.create = createShorthandFactory(ListHeader, (content) => ({ content }))
export default ListHeader
````

## File: elements/List/ListIcon.d.ts/ListIcon.d.ts
````typescript
import { ForwardRefComponent, SemanticVERTICALALIGNMENTS } from '../../generic'
import { StrictIconProps } from '../Icon'
export interface ListIconProps extends StrictListIconProps {
  [key: string]: any
}
export interface StrictListIconProps extends StrictIconProps {
  className?: string
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const ListIcon: ForwardRefComponent<ListIconProps, HTMLElement>
export default ListIcon
````

## File: elements/List/ListIcon.js/ListIcon.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { createShorthandFactory, getUnhandledProps, SUI, getVerticalAlignProp } from '../../lib'
import Icon from '../Icon/Icon'
const ListIcon = React.forwardRef(function (props, ref) {
  const { className, verticalAlign } = props
  const classes = cx(getVerticalAlignProp(verticalAlign), className)
  const rest = getUnhandledProps(ListIcon, props)
  return <Icon {...rest} className={classes} ref={ref} />
})
ListIcon.displayName = 'ListIcon'
ListIcon.propTypes = {
  className: PropTypes.string,
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
ListIcon.create = createShorthandFactory(ListIcon, (name) => ({ name }))
export default ListIcon
````

## File: elements/List/ListItem.d.ts/ListItem.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { ImageProps } from '../Image'
import { ListContentProps } from './ListContent'
import { ListDescriptionProps } from './ListDescription'
import { ListHeaderProps } from './ListHeader'
import { ListIconProps } from './ListIcon'
export interface ListItemProps extends StrictListItemProps {
  [key: string]: any
}
export interface StrictListItemProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandItem<ListContentProps>
  description?: SemanticShorthandItem<ListDescriptionProps>
  disabled?: boolean
  header?: SemanticShorthandItem<ListHeaderProps>
  icon?: SemanticShorthandItem<ListIconProps>
  image?: SemanticShorthandItem<ImageProps>
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: ListItemProps) => void
  value?: string
}
declare const ListItem: ForwardRefComponent<ListItemProps, HTMLDivElement>
export default ListItem
````

## File: elements/List/ListItem.js/ListItem.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { isValidElement } from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
import Image from '../Image'
import ListContent from './ListContent'
import ListDescription from './ListDescription'
import ListHeader from './ListHeader'
import ListIcon from './ListIcon'
const ListItem = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    description,
    disabled,
    header,
    icon,
    image,
    value,
  } = props
  const ElementType = getComponentType(props)
  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(ElementType !== 'li', 'item'),
    className,
  )
  const rest = getUnhandledProps(ListItem, props)
  const handleClick = useEventCallback((e) => {
    if (!disabled) {
      _.invoke(props, 'onClick', e, props)
    }
  })
  const valueProp = ElementType === 'li' ? { value } : { 'data-value': value }
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType
        {...valueProp}
        role='listitem'
        {...rest}
        className={classes}
        onClick={handleClick}
        ref={ref}
      >
        {children}
      </ElementType>
    )
  }
  const iconElement = ListIcon.create(icon, { autoGenerateKey: false })
  const imageElement = Image.create(image, { autoGenerateKey: false })
  if (!isValidElement(content) && _.isPlainObject(content)) {
    return (
      <ElementType
        {...valueProp}
        role='listitem'
        {...rest}
        className={classes}
        onClick={handleClick}
        ref={ref}
      >
        {iconElement || imageElement}
        {ListContent.create(content, {
          autoGenerateKey: false,
          defaultProps: { header, description },
        })}
      </ElementType>
    )
  }
  const headerElement = ListHeader.create(header, { autoGenerateKey: false })
  const descriptionElement = ListDescription.create(description, { autoGenerateKey: false })
  if (iconElement || imageElement) {
    return (
      <ElementType
        {...valueProp}
        role='listitem'
        {...rest}
        className={classes}
        onClick={handleClick}
        ref={ref}
      >
        {iconElement || imageElement}
        {(content || headerElement || descriptionElement) && (
          <ListContent>
            {headerElement}
            {descriptionElement}
            {content}
          </ListContent>
        )}
      </ElementType>
    )
  }
  return (
    <ElementType
      {...valueProp}
      role='listitem'
      {...rest}
      className={classes}
      onClick={handleClick}
      ref={ref}
    >
      {headerElement}
      {descriptionElement}
      {content}
    </ElementType>
  )
})
ListItem.displayName = 'ListItem'
ListItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.itemShorthand,
  description: customPropTypes.itemShorthand,
  disabled: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  icon: customPropTypes.every([customPropTypes.disallow(['image']), customPropTypes.itemShorthand]),
  image: customPropTypes.every([customPropTypes.disallow(['icon']), customPropTypes.itemShorthand]),
  onClick: PropTypes.func,
  value: PropTypes.string,
}
ListItem.create = createShorthandFactory(ListItem, (content) => ({ content }))
export default ListItem
````

## File: elements/List/ListList.d.ts/ListList.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ListListProps extends StrictListListProps {
  [key: string]: any
}
export interface StrictListListProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ListList: ForwardRefComponent<ListListProps, HTMLDivElement>
export default ListList
````

## File: elements/List/ListList.js/ListList.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const ListList = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const rest = getUnhandledProps(ListList, props)
  const ElementType = getComponentType(props)
  const classes = cx(getKeyOnly(ElementType !== 'ul' && ElementType !== 'ol', 'list'), className)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ListList.displayName = 'ListList'
ListList.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default ListList
````

## File: elements/Loader/index.d.ts/index.d.ts
````typescript
export { default, LoaderProps, StrictLoaderProps } from './Loader'
````

## File: elements/Loader/index.js/index.js
````javascript
export default from './Loader'
````

## File: elements/Loader/Loader.d.ts/Loader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticSIZES } from '../../generic'
export interface LoaderProps extends StrictLoaderProps {
  [key: string]: any
}
export interface StrictLoaderProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  disabled?: boolean
  indeterminate?: boolean
  inline?: boolean | 'centered'
  inverted?: boolean
  size?: SemanticSIZES
}
declare const Loader: ForwardRefComponent<LoaderProps, HTMLDivElement>
export default Loader
````

## File: elements/Loader/Loader.js/Loader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
} from '../../lib'
const Loader = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    disabled,
    indeterminate,
    inline,
    inverted,
    size,
  } = props
  const classes = cx(
    'ui',
    size,
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(indeterminate, 'indeterminate'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(children || content, 'text'),
    getKeyOrValueAndKey(inline, 'inline'),
    'loader',
    className,
  )
  const rest = getUnhandledProps(Loader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Loader.displayName = 'Loader'
Loader.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['centered'])]),
  inverted: PropTypes.bool,
  size: PropTypes.oneOf(SUI.SIZES),
}
export default Loader
````

## File: elements/Placeholder/index.d.ts/index.d.ts
````typescript
export { default, PlaceholderProps, StrictPlaceholderProps } from './Placeholder'
````

## File: elements/Placeholder/index.js/index.js
````javascript
export default from './Placeholder'
````

## File: elements/Placeholder/Placeholder.d.ts/Placeholder.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import PlaceholderHeader from './PlaceholderHeader'
import PlaceholderImage from './PlaceholderImage'
import PlaceholderLine from './PlaceholderLine'
import PlaceholderParagraph from './PlaceholderParagraph'
export interface PlaceholderProps extends StrictPlaceholderProps {
  [key: string]: any
}
export interface StrictPlaceholderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  fluid?: boolean
  inverted?: boolean
}
declare const Placeholder: ForwardRefComponent<PlaceholderProps, HTMLDivElement> & {
  Header: typeof PlaceholderHeader
  Line: typeof PlaceholderLine
  Image: typeof PlaceholderImage
  Paragraph: typeof PlaceholderParagraph
}
export default Placeholder
````

## File: elements/Placeholder/Placeholder.js/Placeholder.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import PlaceholderHeader from './PlaceholderHeader'
import PlaceholderImage from './PlaceholderImage'
import PlaceholderLine from './PlaceholderLine'
import PlaceholderParagraph from './PlaceholderParagraph'
const Placeholder = React.forwardRef(function (props, ref) {
  const { children, className, content, fluid, inverted } = props
  const classes = cx(
    'ui',
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(inverted, 'inverted'),
    'placeholder',
    className,
  )
  const rest = getUnhandledProps(Placeholder, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Placeholder.displayName = 'Placeholder'
Placeholder.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  fluid: PropTypes.bool,
  inverted: PropTypes.bool,
}
Placeholder.Header = PlaceholderHeader
Placeholder.Image = PlaceholderImage
Placeholder.Line = PlaceholderLine
Placeholder.Paragraph = PlaceholderParagraph
export default Placeholder
````

## File: elements/Placeholder/PlaceholderHeader.d.ts/PlaceholderHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface PlaceholderHeaderProps extends StrictPlaceholderHeaderProps {
  [key: string]: any
}
export interface StrictPlaceholderHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  image?: boolean
}
declare const PlaceholderHeader: ForwardRefComponent<PlaceholderHeaderProps, HTMLDivElement>
export default PlaceholderHeader
````

## File: elements/Placeholder/PlaceholderHeader.js/PlaceholderHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const PlaceholderHeader = React.forwardRef(function (props, ref) {
  const { children, className, content, image } = props
  const classes = cx(getKeyOnly(image, 'image'), 'header', className)
  const rest = getUnhandledProps(PlaceholderHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
PlaceholderHeader.displayName = 'PlaceholderHeader'
PlaceholderHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  image: PropTypes.bool,
}
export default PlaceholderHeader
````

## File: elements/Placeholder/PlaceholderImage.d.ts/PlaceholderImage.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export interface PlaceholderImageProps extends StrictPlaceholderImageProps {
  [key: string]: any
}
export interface StrictPlaceholderImageProps {
  as?: any
  className?: string
  square?: boolean
  rectangular?: boolean
}
declare const PlaceholderImage: ForwardRefComponent<PlaceholderImageProps, HTMLDivElement>
export default PlaceholderImage
````

## File: elements/Placeholder/PlaceholderImage.js/PlaceholderImage.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { customPropTypes, getComponentType, getUnhandledProps, getKeyOnly } from '../../lib'
const PlaceholderImage = React.forwardRef(function (props, ref) {
  const { className, square, rectangular } = props
  const classes = cx(
    getKeyOnly(square, 'square'),
    getKeyOnly(rectangular, 'rectangular'),
    'image',
    className,
  )
  const rest = getUnhandledProps(PlaceholderImage, props)
  const ElementType = getComponentType(props)
  return <ElementType {...rest} className={classes} ref={ref} />
})
PlaceholderImage.displayName = 'PlaceholderImage'
PlaceholderImage.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  square: customPropTypes.every([customPropTypes.disallow(['rectangular']), PropTypes.bool]),
  rectangular: customPropTypes.every([customPropTypes.disallow(['square']), PropTypes.bool]),
}
export default PlaceholderImage
````

## File: elements/Placeholder/PlaceholderLine.d.ts/PlaceholderLine.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export interface PlaceholderLineProps extends StrictPlaceholderLineProps {
  [key: string]: any
}
export interface StrictPlaceholderLineProps {
  as?: any
  className?: string
  length?: 'full' | 'very long' | 'long' | 'medium' | 'short' | 'very short'
}
declare const PlaceholderLine: ForwardRefComponent<PlaceholderLineProps, HTMLDivElement>
export default PlaceholderLine
````

## File: elements/Placeholder/PlaceholderLine.js/PlaceholderLine.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
const PlaceholderLine = React.forwardRef(function (props, ref) {
  const { className, length } = props
  const classes = cx('line', length, className)
  const rest = getUnhandledProps(PlaceholderLine, props)
  const ElementType = getComponentType(props)
  return <ElementType {...rest} className={classes} ref={ref} />
})
PlaceholderLine.displayName = 'PlaceholderLine'
PlaceholderLine.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  length: PropTypes.oneOf(['full', 'very long', 'long', 'medium', 'short', 'very short']),
}
export default PlaceholderLine
````

## File: elements/Placeholder/PlaceholderParagraph.d.ts/PlaceholderParagraph.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface PlaceholderParagraphProps extends StrictPlaceholderParagraphProps {
  [key: string]: any
}
export interface StrictPlaceholderParagraphProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const PlaceholderParagraph: ForwardRefComponent<PlaceholderParagraphProps, HTMLDivElement>
export default PlaceholderParagraph
````

## File: elements/Placeholder/PlaceholderParagraph.js/PlaceholderParagraph.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const PlaceholderParagraph = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('paragraph', className)
  const rest = getUnhandledProps(PlaceholderParagraph, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
PlaceholderParagraph.displayName = 'PlaceholderParagraph'
PlaceholderParagraph.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default PlaceholderParagraph
````

## File: elements/Rail/index.d.ts/index.d.ts
````typescript
export { default, RailProps, StrictRailProps } from './Rail'
````

## File: elements/Rail/index.js/index.js
````javascript
export default from './Rail'
````

## File: elements/Rail/Rail.d.ts/Rail.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticFLOATS, SemanticShorthandContent } from '../../generic'
export interface RailProps extends StrictRailProps {
  [key: string]: any
}
export interface StrictRailProps {
  as?: any
  attached?: boolean
  children?: React.ReactNode
  className?: string
  close?: boolean | 'very'
  content?: SemanticShorthandContent
  dividing?: boolean
  internal?: boolean
  position: SemanticFLOATS
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
}
declare const Rail: ForwardRefComponent<RailProps, HTMLDivElement>
export default Rail
````

## File: elements/Rail/Rail.js/Rail.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
} from '../../lib'
const Rail = React.forwardRef(function (props, ref) {
  const {
    attached,
    children,
    className,
    close,
    content,
    dividing,
    internal,
    position,
    size,
  } = props
  const classes = cx(
    'ui',
    position,
    size,
    getKeyOnly(attached, 'attached'),
    getKeyOnly(dividing, 'dividing'),
    getKeyOnly(internal, 'internal'),
    getKeyOrValueAndKey(close, 'close'),
    'rail',
    className,
  )
  const rest = getUnhandledProps(Rail, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Rail.displayName = 'Rail'
Rail.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  content: customPropTypes.contentShorthand,
  dividing: PropTypes.bool,
  internal: PropTypes.bool,
  position: PropTypes.oneOf(SUI.FLOATS).isRequired,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
}
export default Rail
````

## File: elements/Reveal/index.d.ts/index.d.ts
````typescript
export { default, RevealProps, StrictRevealProps } from './Reveal'
````

## File: elements/Reveal/index.js/index.js
````javascript
export default from './Reveal'
````

## File: elements/Reveal/Reveal.d.ts/Reveal.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import RevealContent from './RevealContent'
export interface RevealProps extends StrictRevealProps {
  [key: string]: any
}
export interface StrictRevealProps {
  as?: any
  active?: boolean
  animated?:
    | 'fade'
    | 'small fade'
    | 'move'
    | 'move right'
    | 'move up'
    | 'move down'
    | 'rotate'
    | 'rotate left'
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  disabled?: boolean
  instant?: boolean
}
declare const Reveal: ForwardRefComponent<RevealProps, HTMLDivElement> & {
  Content: typeof RevealContent
}
export default Reveal
````

## File: elements/Reveal/Reveal.js/Reveal.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import RevealContent from './RevealContent'
const Reveal = React.forwardRef(function (props, ref) {
  const { active, animated, children, className, content, disabled, instant } = props
  const classes = cx(
    'ui',
    animated,
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(instant, 'instant'),
    'reveal',
    className,
  )
  const rest = getUnhandledProps(Reveal, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Reveal.displayName = 'Reveal'
Reveal.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  animated: PropTypes.oneOf([
    'fade',
    'small fade',
    'move',
    'move right',
    'move up',
    'move down',
    'rotate',
    'rotate left',
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  instant: PropTypes.bool,
}
Reveal.Content = RevealContent
export default Reveal
````

## File: elements/Reveal/RevealContent.d.ts/RevealContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface RevealContentProps extends StrictRevealContentProps {
  [key: string]: any
}
export interface StrictRevealContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  hidden?: boolean
  visible?: boolean
}
declare const RevealContent: ForwardRefComponent<RevealContentProps, HTMLDivElement>
export default RevealContent
````

## File: elements/Reveal/RevealContent.js/RevealContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const RevealContent = React.forwardRef(function (props, ref) {
  const { children, className, content, hidden, visible } = props
  const classes = cx(
    'ui',
    getKeyOnly(hidden, 'hidden'),
    getKeyOnly(visible, 'visible'),
    'content',
    className,
  )
  const rest = getUnhandledProps(RevealContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
RevealContent.displayName = 'RevealContent'
RevealContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  hidden: PropTypes.bool,
  visible: PropTypes.bool,
}
export default RevealContent
````

## File: elements/Segment/index.d.ts/index.d.ts
````typescript
export { default, SegmentProps, StrictSegmentProps } from './Segment'
````

## File: elements/Segment/index.js/index.js
````javascript
export default from './Segment'
````

## File: elements/Segment/Segment.d.ts/Segment.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticShorthandContent,
  SemanticTEXTALIGNMENTS,
} from '../../generic'
import SegmentGroup from './SegmentGroup'
import SegmentInline from './SegmentInline'
export type SegmentSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
export interface SegmentProps extends StrictSegmentProps {
  [key: string]: any
}
export interface StrictSegmentProps {
  as?: any
  attached?: boolean | 'top' | 'bottom'
  basic?: boolean
  children?: React.ReactNode
  circular?: boolean
  className?: string
  clearing?: boolean
  color?: SemanticCOLORS
  compact?: boolean
  content?: SemanticShorthandContent
  disabled?: boolean
  floated?: SemanticFLOATS
  inverted?: boolean
  loading?: boolean
  padded?: boolean | 'very'
  placeholder?: boolean
  piled?: boolean
  raised?: boolean
  secondary?: boolean
  size?: SegmentSizeProp
  stacked?: boolean
  tertiary?: boolean
  textAlign?: SemanticTEXTALIGNMENTS
  vertical?: boolean
}
declare const Segment: ForwardRefComponent<SegmentProps, HTMLDivElement> & {
  Group: typeof SegmentGroup
  Inline: typeof SegmentInline
}
export default Segment
````

## File: elements/Segment/Segment.js/Segment.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getTextAlignProp,
  getValueAndKey,
} from '../../lib'
import SegmentGroup from './SegmentGroup'
import SegmentInline from './SegmentInline'
const Segment = React.forwardRef(function (props, ref) {
  const {
    attached,
    basic,
    children,
    circular,
    className,
    clearing,
    color,
    compact,
    content,
    disabled,
    floated,
    inverted,
    loading,
    placeholder,
    padded,
    piled,
    raised,
    secondary,
    size,
    stacked,
    tertiary,
    textAlign,
    vertical,
  } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(basic, 'basic'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(clearing, 'clearing'),
    getKeyOnly(compact, 'compact'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(loading, 'loading'),
    getKeyOnly(placeholder, 'placeholder'),
    getKeyOnly(piled, 'piled'),
    getKeyOnly(raised, 'raised'),
    getKeyOnly(secondary, 'secondary'),
    getKeyOnly(stacked, 'stacked'),
    getKeyOnly(tertiary, 'tertiary'),
    getKeyOnly(vertical, 'vertical'),
    getKeyOrValueAndKey(attached, 'attached'),
    getKeyOrValueAndKey(padded, 'padded'),
    getTextAlignProp(textAlign),
    getValueAndKey(floated, 'floated'),
    'segment',
    className,
  )
  const rest = getUnhandledProps(Segment, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Segment.Group = SegmentGroup
Segment.Inline = SegmentInline
Segment.displayName = 'Segment'
Segment.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
  basic: PropTypes.bool,
  children: PropTypes.node,
  circular: PropTypes.bool,
  className: PropTypes.string,
  clearing: PropTypes.bool,
  color: PropTypes.oneOf(SUI.COLORS),
  compact: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  floated: PropTypes.oneOf(SUI.FLOATS),
  inverted: PropTypes.bool,
  loading: PropTypes.bool,
  padded: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  placeholder: PropTypes.bool,
  piled: PropTypes.bool,
  raised: PropTypes.bool,
  secondary: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  stacked: PropTypes.bool,
  tertiary: PropTypes.bool,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
  vertical: PropTypes.bool,
}
export default Segment
````

## File: elements/Segment/SegmentGroup.d.ts/SegmentGroup.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import { SegmentSizeProp } from './Segment'
export interface SegmentGroupProps extends StrictSegmentGroupProps {
  [key: string]: any
}
export interface StrictSegmentGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  compact?: boolean
  content?: SemanticShorthandContent
  horizontal?: boolean
  piled?: boolean
  raised?: boolean
  size?: SegmentSizeProp
  stacked?: boolean
}
declare const SegmentGroup: ForwardRefComponent<SegmentGroupProps, HTMLDivElement>
export default SegmentGroup
````

## File: elements/Segment/SegmentGroup.js/SegmentGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
} from '../../lib'
const SegmentGroup = React.forwardRef(function (props, ref) {
  const { children, className, compact, content, horizontal, piled, raised, size, stacked } = props
  const classes = cx(
    'ui',
    size,
    getKeyOnly(compact, 'compact'),
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(piled, 'piled'),
    getKeyOnly(raised, 'raised'),
    getKeyOnly(stacked, 'stacked'),
    'segments',
    className,
  )
  const rest = getUnhandledProps(SegmentGroup, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
SegmentGroup.displayName = 'SegmentGroup'
SegmentGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  compact: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  horizontal: PropTypes.bool,
  piled: PropTypes.bool,
  raised: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  stacked: PropTypes.bool,
}
export default SegmentGroup
````

## File: elements/Segment/SegmentInline.d.ts/SegmentInline.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface SegmentInlineProps extends StrictSegmentInlineProps {
  [key: string]: any
}
export interface StrictSegmentInlineProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const SegmentInline: ForwardRefComponent<SegmentInlineProps, HTMLDivElement>
export default SegmentInline
````

## File: elements/Segment/SegmentInline.js/SegmentInline.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const SegmentInline = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('inline', className)
  const rest = getUnhandledProps(SegmentInline, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
SegmentInline.displayName = 'SegmentInline'
SegmentInline.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default SegmentInline
````

## File: elements/Step/index.d.ts/index.d.ts
````typescript
export { default, StepProps, StrictStepProps } from './Step'
````

## File: elements/Step/index.js/index.js
````javascript
export default from './Step'
````

## File: elements/Step/Step.d.ts/Step.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { IconProps } from '../Icon'
import StepContent from './StepContent'
import StepDescription, { StepDescriptionProps } from './StepDescription'
import StepGroup from './StepGroup'
import StepTitle, { StepTitleProps } from './StepTitle'
export interface StepProps extends StrictStepProps {
  [key: string]: any
}
export interface StrictStepProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  completed?: boolean
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<StepDescriptionProps>
  disabled?: boolean
  href?: string
  icon?: SemanticShorthandItem<IconProps>
  link?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: StepProps) => void
  ordered?: boolean
  title?: SemanticShorthandItem<StepTitleProps>
}
declare const Step: ForwardRefComponent<StepProps, HTMLDivElement> & {
  Content: typeof StepContent
  Description: typeof StepDescription
  Group: typeof StepGroup
  Title: typeof StepTitle
}
export default Step
````

## File: elements/Step/Step.js/Step.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
import Icon from '../Icon'
import StepContent from './StepContent'
import StepDescription from './StepDescription'
import StepGroup from './StepGroup'
import StepTitle from './StepTitle'
const Step = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    completed,
    content,
    description,
    disabled,
    href,
    onClick,
    icon,
    link,
    title,
  } = props
  const handleClick = useEventCallback((e) => {
    if (!disabled) {
      _.invoke(props, 'onClick', e, props)
    }
  })
  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(completed, 'completed'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(link, 'link'),
    'step',
    className,
  )
  const rest = getUnhandledProps(Step, props)
  const ElementType = getComponentType(props, {
    getDefault: () => {
      if (onClick) {
        return 'a'
      }
    },
  })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {StepContent.create({ description, title }, { autoGenerateKey: false })}
    </ElementType>
  )
})
Step.displayName = 'Step'
Step.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  completed: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  icon: customPropTypes.itemShorthand,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  ordered: PropTypes.bool,
  title: customPropTypes.itemShorthand,
}
Step.Content = StepContent
Step.Description = StepDescription
Step.Group = StepGroup
Step.Title = StepTitle
Step.create = createShorthandFactory(Step, (content) => ({ content }))
export default Step
````

## File: elements/Step/StepContent.d.ts/StepContent.d.ts
````typescript
import * as React from 'react'
import { SemanticShorthandItem, SemanticShorthandContent, ForwardRefComponent } from '../../generic'
import { StepDescriptionProps } from './StepDescription'
import { StepTitleProps } from './StepTitle'
export interface StepContentProps extends StrictStepContentProps {
  [key: string]: any
}
export interface StrictStepContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<StepDescriptionProps>
  title?: SemanticShorthandItem<StepTitleProps>
}
declare const StepContent: ForwardRefComponent<StepContentProps, HTMLDivElement>
export default StepContent
````

## File: elements/Step/StepContent.js/StepContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import StepDescription from './StepDescription'
import StepTitle from './StepTitle'
const StepContent = React.forwardRef(function (props, ref) {
  const { children, className, content, description, title } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(StepContent, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {StepTitle.create(title, { autoGenerateKey: false })}
      {StepDescription.create(description, { autoGenerateKey: false })}
    </ElementType>
  )
})
StepContent.displayName = 'StepContent'
StepContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  title: customPropTypes.itemShorthand,
}
StepContent.create = createShorthandFactory(StepContent, (content) => ({ content }))
export default StepContent
````

## File: elements/Step/StepDescription.d.ts/StepDescription.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface StepDescriptionProps extends StrictStepDescriptionProps {
  [key: string]: any
}
export interface StrictStepDescriptionProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const StepDescription: ForwardRefComponent<StepDescriptionProps, HTMLDivElement>
export default StepDescription
````

## File: elements/Step/StepDescription.js/StepDescription.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const StepDescription = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('description', className)
  const rest = getUnhandledProps(StepDescription, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
StepDescription.displayName = 'StepDescription'
StepDescription.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
StepDescription.create = createShorthandFactory(StepDescription, (content) => ({ content }))
export default StepDescription
````

## File: elements/Step/StepGroup.d.ts/StepGroup.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandCollection,
  SemanticShorthandContent,
} from '../../generic'
import { StepProps } from './Step'
export interface StepGroupProps extends StrictStepGroupProps {
  [key: string]: any
}
export interface StrictStepGroupProps {
  as?: any
  attached?: boolean | 'bottom' | 'top'
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  fluid?: boolean
  items?: SemanticShorthandCollection<StepProps>
  ordered?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
  stackable?: 'tablet'
  unstackable?: boolean
  vertical?: boolean
  widths?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | 'one'
    | 'two'
    | 'three'
    | 'four'
    | 'five'
    | 'six'
    | 'seven'
    | 'eight'
}
declare const StepGroup: ForwardRefComponent<StepGroupProps, HTMLDivElement>
export default StepGroup
````

## File: elements/Step/StepGroup.js/StepGroup.js
````javascript
import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  numberToWordMap,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getWidthProp,
} from '../../lib'
import Step from './Step'
const numberMap = _.pickBy(numberToWordMap, (val, key) => key <= 8)
const StepGroup = React.forwardRef(function (props, ref) {
  const {
    attached,
    children,
    className,
    content,
    fluid,
    items,
    ordered,
    size,
    stackable,
    unstackable,
    vertical,
    widths,
  } = props
  const classes = cx(
    'ui',
    size,
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(ordered, 'ordered'),
    getKeyOnly(unstackable, 'unstackable'),
    getKeyOnly(vertical, 'vertical'),
    getKeyOrValueAndKey(attached, 'attached'),
    getValueAndKey(stackable, 'stackable'),
    getWidthProp(widths),
    'steps',
    className,
  )
  const rest = getUnhandledProps(StepGroup, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {_.map(items, (item) => Step.create(item))}
    </ElementType>
  )
})
StepGroup.displayName = 'StepGroup'
StepGroup.propTypes = {
  as: PropTypes.elementType,
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['top', 'bottom'])]),
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  fluid: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  ordered: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  stackable: PropTypes.oneOf(['tablet']),
  unstackable: PropTypes.bool,
  vertical: PropTypes.bool,
  widths: PropTypes.oneOf([
    ..._.keys(numberMap),
    ..._.keys(numberMap).map(Number),
    ..._.values(numberMap),
  ]),
}
export default StepGroup
````

## File: elements/Step/StepTitle.d.ts/StepTitle.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface StepTitleProps extends StrictStepTitleProps {
  [key: string]: any
}
export interface StrictStepTitleProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const StepTitle: ForwardRefComponent<StepTitleProps, HTMLDivElement>
export default StepTitle
````

## File: elements/Step/StepTitle.js/StepTitle.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const StepTitle = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('title', className)
  const rest = getUnhandledProps(StepTitle, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
StepTitle.displayName = 'StepTitle'
StepTitle.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
StepTitle.create = createShorthandFactory(StepTitle, (content) => ({ content }))
export default StepTitle
````

## File: generic.d.ts/generic.d.ts
````typescript
import * as React from 'react'
export type ForwardRefComponent<P, T> = React.ForwardRefExoticComponent<P & React.RefAttributes<T>>
export type SemanticFLOATS = 'left' | 'right'
export type SemanticTEXTALIGNMENTS = 'left' | 'center' | 'right' | 'justified'
export type SemanticVERTICALALIGNMENTS = 'top' | 'middle' | 'bottom'
export interface HtmlLabelProps extends StrictHtmlLabelProps {
  [key: string]: any
}
export interface StrictHtmlLabelProps {
  children?: React.ReactNode
}
export interface HtmlIframeProps extends StrictHtmlIframeProps {
  [key: string]: any
}
export interface StrictHtmlIframeProps {
  src?: string
}
export interface HtmlImageProps extends StrictHtmlImageProps {
  [key: string]: any
}
export interface StrictHtmlImageProps {
  src?: string
}
export interface HtmlInputrops extends StrictHtmlInputrops {
  [key: string]: any
}
export interface StrictHtmlInputrops {
  type?: string
}
export interface HtmlSpanProps extends StrictHtmlSpanProps {
  [key: string]: any
}
export interface StrictHtmlSpanProps {
  children?: React.ReactNode
}
export type SemanticShorthandItemFunc<TProps> = (
  component: React.ElementType<TProps>,
  props: TProps,
  children?: React.ReactNode | React.ReactNodeArray,
) => React.ReactElement<any> | null
export type ShorthandRenderFunction<C extends React.ElementType, P> = (
  Component: C,
  props: P,
) => React.ReactNode
export type SemanticShorthandCollection<TProps extends Record<string, any>> = SemanticShorthandItem<
  TProps
>[]
export type SemanticShorthandContent = React.ReactNode
export type SemanticShorthandItem<TProps extends Record<string, any>> =
  | React.ReactNode
  | SemanticShorthandItemFunc<TProps>
  | (Omit<TProps, 'children'> & {
      children?: TProps extends { children: any }
        ? TProps['children'] | ShorthandRenderFunction<React.ElementType<TProps>, TProps>
        : ShorthandRenderFunction<React.ElementType<TProps>, TProps>
    })
export type SemanticCOLORS =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'olive'
  | 'green'
  | 'teal'
  | 'blue'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'grey'
  | 'black'
export type SemanticSIZES =
  | 'mini'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'big'
  | 'huge'
  | 'massive'
type SemanticDIRECTIONALTRANSITIONS =
  | 'browse'
  | 'browse right'
  | 'drop'
  | 'fade'
  | 'fade up'
  | 'fade down'
  | 'fade left'
  | 'fade right'
  | 'fly up'
  | 'fly down'
  | 'fly left'
  | 'fly right'
  | 'horizontal flip'
  | 'vertical flip'
  | 'scale'
  | 'slide up'
  | 'slide down'
  | 'slide left'
  | 'slide right'
  | 'swing up'
  | 'swing down'
  | 'swing left'
  | 'swing right'
  | 'zoom'
type SemanticSTATICTRANSITIONS = 'jiggle' | 'flash' | 'shake' | 'pulse' | 'tada' | 'bounce' | 'glow'
export type SemanticTRANSITIONS = SemanticDIRECTIONALTRANSITIONS | SemanticSTATICTRANSITIONS
type SemanticWIDTHSNUMBER = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16
type SemanticWIDTHSSTRING =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'eleven'
  | 'twelve'
  | 'thirteen'
  | 'fourteen'
  | 'fifteen'
  | 'sixteen'
export type SemanticWIDTHS = SemanticWIDTHSNUMBER | SemanticWIDTHSSTRING
export type SemanticICONS =
  | 'american sign language interpreting'
  | 'assistive listening systems'
  | 'audio description'
  | 'blind'
  | 'braille'
  | 'closed captioning'
  | 'closed captioning outline'
  | 'deaf'
  | 'low vision'
  | 'phone volume'
  | 'question circle'
  | 'question circle outline'
  | 'sign language'
  | 'tty'
  | 'universal access'
  | 'wheelchair'
  | 'angle double down'
  | 'angle double left'
  | 'angle double right'
  | 'angle double up'
  | 'angle down'
  | 'angle left'
  | 'angle right'
  | 'angle up'
  | 'arrow alternate circle down'
  | 'arrow alternate circle down outline'
  | 'arrow alternate circle left'
  | 'arrow alternate circle left outline'
  | 'arrow alternate circle right'
  | 'arrow alternate circle right outline'
  | 'arrow alternate circle up'
  | 'arrow alternate circle up outline'
  | 'arrow circle down'
  | 'arrow circle left'
  | 'arrow circle right'
  | 'arrow circle up'
  | 'arrow down'
  | 'arrow left'
  | 'arrow right'
  | 'arrow up'
  | 'arrows alternate'
  | 'arrows alternate horizontal'
  | 'arrows alternate vertical'
  | 'caret down'
  | 'caret left'
  | 'caret right'
  | 'caret square down'
  | 'caret square down outline'
  | 'caret square left'
  | 'caret square left outline'
  | 'caret square right'
  | 'caret square right outline'
  | 'caret square up'
  | 'caret square up outline'
  | 'caret up'
  | 'cart arrow down'
  | 'chart line'
  | 'chevron circle down'
  | 'chevron circle left'
  | 'chevron circle right'
  | 'chevron circle up'
  | 'chevron down'
  | 'chevron left'
  | 'chevron right'
  | 'chevron up'
  | 'cloud download'
  | 'cloud upload'
  | 'download'
  | 'exchange'
  | 'expand arrows alternate'
  | 'external alternate'
  | 'external square alternate'
  | 'hand point down'
  | 'hand point down outline'
  | 'hand point left'
  | 'hand point left outline'
  | 'hand point right'
  | 'hand point right outline'
  | 'hand point up'
  | 'hand point up outline'
  | 'hand pointer'
  | 'hand pointer outline'
  | 'history'
  | 'level down alternate'
  | 'level up alternate'
  | 'location arrow'
  | 'long arrow alternate down'
  | 'long arrow alternate left'
  | 'long arrow alternate right'
  | 'long arrow alternate up'
  | 'mouse pointer'
  | 'play'
  | 'random'
  | 'recycle'
  | 'redo'
  | 'redo alternate'
  | 'reply'
  | 'reply all'
  | 'retweet'
  | 'share'
  | 'share square'
  | 'share square outline'
  | 'sign-in'
  | 'sign-out'
  | 'sign-in alternate'
  | 'sign-out alternate'
  | 'sort'
  | 'sort alphabet down'
  | 'sort alphabet up'
  | 'sort amount down'
  | 'sort amount up'
  | 'sort down'
  | 'sort numeric down'
  | 'sort numeric up'
  | 'sort up'
  | 'sync'
  | 'sync alternate'
  | 'text height'
  | 'text width'
  | 'undo'
  | 'undo alternate'
  | 'upload'
  | 'zoom-in'
  | 'zoom-out'
  | 'audio description'
  | 'backward'
  | 'circle'
  | 'circle outline'
  | 'closed captioning'
  | 'closed captioning outline'
  | 'compress'
  | 'eject'
  | 'expand'
  | 'expand arrows alternate'
  | 'fast backward'
  | 'fast forward'
  | 'file audio'
  | 'file audio outline'
  | 'file video'
  | 'file video outline'
  | 'film'
  | 'forward'
  | 'headphones'
  | 'microphone'
  | 'microphone slash'
  | 'music'
  | 'pause'
  | 'pause circle'
  | 'pause circle outline'
  | 'phone volume'
  | 'play'
  | 'play circle'
  | 'play circle outline'
  | 'podcast'
  | 'random'
  | 'redo'
  | 'redo alternate'
  | 'rss'
  | 'rss square'
  | 'step backward'
  | 'step forward'
  | 'stop'
  | 'stop circle'
  | 'stop circle outline'
  | 'sync'
  | 'sync alternate'
  | 'undo'
  | 'undo alternate'
  | 'video'
  | 'volume down'
  | 'volume off'
  | 'volume up'
  | 'address book'
  | 'address book outline'
  | 'address card'
  | 'address card outline'
  | 'archive'
  | 'balance scale'
  | 'birthday cake'
  | 'book'
  | 'briefcase'
  | 'building'
  | 'building outline'
  | 'bullhorn'
  | 'bullseye'
  | 'calculator'
  | 'calendar'
  | 'calendar outline'
  | 'calendar alternate'
  | 'calendar alternate outline'
  | 'certificate'
  | 'chart area'
  | 'chart bar'
  | 'chart bar outline'
  | 'chart line'
  | 'chart pie'
  | 'clipboard'
  | 'clipboard outline'
  | 'coffee'
  | 'columns'
  | 'compass'
  | 'compass outline'
  | 'copy'
  | 'copy outline'
  | 'copyright'
  | 'copyright outline'
  | 'cut'
  | 'edit'
  | 'edit outline'
  | 'envelope'
  | 'envelope outline'
  | 'envelope open'
  | 'envelope open outline'
  | 'envelope square'
  | 'eraser'
  | 'fax'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'folder'
  | 'folder outline'
  | 'folder open'
  | 'folder open outline'
  | 'globe'
  | 'industry'
  | 'paperclip'
  | 'paste'
  | 'pen square'
  | 'pencil alternate'
  | 'percent'
  | 'phone'
  | 'phone square'
  | 'phone volume'
  | 'registered'
  | 'registered outline'
  | 'save'
  | 'save outline'
  | 'sitemap'
  | 'sticky note'
  | 'sticky note outline'
  | 'suitcase'
  | 'table'
  | 'tag'
  | 'tags'
  | 'tasks'
  | 'thumbtack'
  | 'trademark'
  | 'chess'
  | 'chess bishop'
  | 'chess board'
  | 'chess king'
  | 'chess knight'
  | 'chess pawn'
  | 'chess queen'
  | 'chess rook'
  | 'square full'
  | 'archive'
  | 'barcode'
  | 'bath'
  | 'bug'
  | 'code'
  | 'code branch'
  | 'coffee'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'file code'
  | 'file code outline'
  | 'filter'
  | 'fire extinguisher'
  | 'folder'
  | 'folder outline'
  | 'folder open'
  | 'folder open outline'
  | 'keyboard'
  | 'keyboard outline'
  | 'microchip'
  | 'qrcode'
  | 'shield alternate'
  | 'sitemap'
  | 'terminal'
  | 'user secret'
  | 'window close'
  | 'window close outline'
  | 'window maximize'
  | 'window maximize outline'
  | 'window minimize'
  | 'window minimize outline'
  | 'window restore'
  | 'window restore outline'
  | 'address book'
  | 'address book outline'
  | 'address card'
  | 'address card outline'
  | 'american sign language interpreting'
  | 'assistive listening systems'
  | 'at'
  | 'bell'
  | 'bell outline'
  | 'bell slash'
  | 'bell slash outline'
  | 'bullhorn'
  | 'comment'
  | 'comment outline'
  | 'comment alternate'
  | 'comment alternate outline'
  | 'comments'
  | 'comments outline'
  | 'envelope'
  | 'envelope outline'
  | 'envelope open'
  | 'envelope open outline'
  | 'envelope square'
  | 'fax'
  | 'inbox'
  | 'language'
  | 'microphone'
  | 'microphone slash'
  | 'mobile'
  | 'mobile alternate'
  | 'paper plane'
  | 'paper plane outline'
  | 'phone'
  | 'phone square'
  | 'phone volume'
  | 'rss'
  | 'rss square'
  | 'tty'
  | 'wifi'
  | 'desktop'
  | 'download'
  | 'hdd'
  | 'hdd outline'
  | 'headphones'
  | 'keyboard'
  | 'keyboard outline'
  | 'laptop'
  | 'microchip'
  | 'mobile'
  | 'mobile alternate'
  | 'plug'
  | 'power off'
  | 'print'
  | 'save'
  | 'save outline'
  | 'server'
  | 'tablet'
  | 'tablet alternate'
  | 'tv'
  | 'upload'
  | 'dollar sign'
  | 'euro sign'
  | 'lira sign'
  | 'money bill alternate'
  | 'money bill alternate outline'
  | 'pound sign'
  | 'ruble sign'
  | 'rupee sign'
  | 'shekel sign'
  | 'won sign'
  | 'yen sign'
  | 'bell'
  | 'bell outline'
  | 'bell slash'
  | 'bell slash outline'
  | 'calendar'
  | 'calendar outline'
  | 'calendar alternate'
  | 'calendar alternate outline'
  | 'calendar check'
  | 'calendar check outline'
  | 'calendar minus'
  | 'calendar minus outline'
  | 'calendar plus'
  | 'calendar plus outline'
  | 'calendar times'
  | 'calendar times outline'
  | 'clock'
  | 'clock outline'
  | 'hourglass'
  | 'hourglass outline'
  | 'hourglass end'
  | 'hourglass half'
  | 'hourglass start'
  | 'stopwatch'
  | 'adjust'
  | 'clone'
  | 'clone outline'
  | 'copy'
  | 'copy outline'
  | 'crop'
  | 'crosshairs'
  | 'cut'
  | 'edit'
  | 'edit outline'
  | 'eraser'
  | 'eye'
  | 'eye dropper'
  | 'eye slash'
  | 'eye slash outline'
  | 'object group'
  | 'object group outline'
  | 'object ungroup'
  | 'object ungroup outline'
  | 'paint brush'
  | 'paste'
  | 'pencil alternate'
  | 'save'
  | 'save outline'
  | 'tint'
  | 'align center'
  | 'align justify'
  | 'align left'
  | 'align right'
  | 'bold'
  | 'clipboard'
  | 'clipboard outline'
  | 'clone'
  | 'clone outline'
  | 'columns'
  | 'copy'
  | 'copy outline'
  | 'cut'
  | 'edit'
  | 'edit outline'
  | 'eraser'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'font'
  | 'heading'
  | 'i cursor'
  | 'indent'
  | 'italic'
  | 'linkify'
  | 'list'
  | 'list alternate'
  | 'list alternate outline'
  | 'list ol'
  | 'list ul'
  | 'outdent'
  | 'paper plane'
  | 'paper plane outline'
  | 'paperclip'
  | 'paragraph'
  | 'paste'
  | 'pencil alternate'
  | 'print'
  | 'quote left'
  | 'quote right'
  | 'redo'
  | 'redo alternate'
  | 'reply'
  | 'reply all'
  | 'share'
  | 'strikethrough'
  | 'subscript'
  | 'superscript'
  | 'sync'
  | 'sync alternate'
  | 'table'
  | 'tasks'
  | 'text height'
  | 'text width'
  | 'th'
  | 'th large'
  | 'th list'
  | 'trash'
  | 'trash alternate'
  | 'trash alternate outline'
  | 'underline'
  | 'undo'
  | 'undo alternate'
  | 'unlink'
  | 'archive'
  | 'clone'
  | 'clone outline'
  | 'copy'
  | 'copy outline'
  | 'cut'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'file archive'
  | 'file archive outline'
  | 'file audio'
  | 'file audio outline'
  | 'file code'
  | 'file code outline'
  | 'file excel'
  | 'file excel outline'
  | 'file image'
  | 'file image outline'
  | 'file pdf'
  | 'file pdf outline'
  | 'file powerpoint'
  | 'file powerpoint outline'
  | 'file video'
  | 'file video outline'
  | 'file word'
  | 'file word outline'
  | 'folder'
  | 'folder outline'
  | 'folder open'
  | 'folder open outline'
  | 'paste'
  | 'save'
  | 'save outline'
  | 'sticky note'
  | 'sticky note outline'
  | 'genderless'
  | 'mars'
  | 'mars double'
  | 'mars stroke'
  | 'mars stroke horizontal'
  | 'mars stroke vertical'
  | 'mercury'
  | 'neuter'
  | 'transgender'
  | 'transgender alternate'
  | 'venus'
  | 'venus double'
  | 'venus mars'
  | 'hand lizard'
  | 'hand lizard outline'
  | 'hand paper'
  | 'hand paper outline'
  | 'hand peace'
  | 'hand peace outline'
  | 'hand point down'
  | 'hand point down outline'
  | 'hand point left'
  | 'hand point left outline'
  | 'hand point right'
  | 'hand point right outline'
  | 'hand point up'
  | 'hand point up outline'
  | 'hand pointer'
  | 'hand pointer outline'
  | 'hand rock'
  | 'hand rock outline'
  | 'hand scissors'
  | 'hand scissors outline'
  | 'hand spock'
  | 'hand spock outline'
  | 'handshake'
  | 'handshake outline'
  | 'thumbs down'
  | 'thumbs down outline'
  | 'thumbs up'
  | 'thumbs up outline'
  | 'ambulance'
  | 'h square'
  | 'heart'
  | 'heart outline'
  | 'heartbeat'
  | 'hospital'
  | 'hospital outline'
  | 'medkit'
  | 'plus square'
  | 'plus square outline'
  | 'stethoscope'
  | 'user md'
  | 'wheelchair'
  | 'adjust'
  | 'bolt'
  | 'camera'
  | 'camera retro'
  | 'clone'
  | 'clone outline'
  | 'compress'
  | 'expand'
  | 'eye'
  | 'eye dropper'
  | 'eye slash'
  | 'eye slash outline'
  | 'file image'
  | 'file image outline'
  | 'film'
  | 'id badge'
  | 'id badge outline'
  | 'id card'
  | 'id card outline'
  | 'image'
  | 'image outline'
  | 'images'
  | 'images outline'
  | 'sliders horizontal'
  | 'tint'
  | 'ban'
  | 'barcode'
  | 'bars'
  | 'beer'
  | 'bell'
  | 'bell outline'
  | 'bell slash'
  | 'bell slash outline'
  | 'bug'
  | 'bullhorn'
  | 'bullseye'
  | 'calculator'
  | 'calendar'
  | 'calendar outline'
  | 'calendar alternate'
  | 'calendar alternate outline'
  | 'calendar check'
  | 'calendar check outline'
  | 'calendar minus'
  | 'calendar minus outline'
  | 'calendar plus'
  | 'calendar plus outline'
  | 'calendar times'
  | 'calendar times outline'
  | 'certificate'
  | 'check'
  | 'check circle'
  | 'check circle outline'
  | 'check square'
  | 'check square outline'
  | 'circle'
  | 'circle outline'
  | 'clipboard'
  | 'clipboard outline'
  | 'clone'
  | 'clone outline'
  | 'cloud'
  | 'cloud download'
  | 'cloud upload'
  | 'coffee'
  | 'cog'
  | 'cogs'
  | 'copy'
  | 'copy outline'
  | 'cut'
  | 'database'
  | 'dot circle'
  | 'dot circle outline'
  | 'download'
  | 'edit'
  | 'edit outline'
  | 'ellipsis horizontal'
  | 'ellipsis vertical'
  | 'envelope'
  | 'envelope outline'
  | 'envelope open'
  | 'envelope open outline'
  | 'eraser'
  | 'exclamation'
  | 'exclamation circle'
  | 'exclamation triangle'
  | 'external alternate'
  | 'external square alternate'
  | 'eye'
  | 'eye slash'
  | 'eye slash outline'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'filter'
  | 'flag'
  | 'flag outline'
  | 'flag checkered'
  | 'folder'
  | 'folder outline'
  | 'folder open'
  | 'folder open outline'
  | 'frown'
  | 'frown outline'
  | 'hashtag'
  | 'heart'
  | 'heart outline'
  | 'history'
  | 'home'
  | 'i cursor'
  | 'info'
  | 'info circle'
  | 'language'
  | 'magic'
  | 'meh'
  | 'meh outline'
  | 'microphone'
  | 'microphone slash'
  | 'minus'
  | 'minus circle'
  | 'minus square'
  | 'minus square outline'
  | 'paste'
  | 'pencil alternate'
  | 'plus'
  | 'plus circle'
  | 'plus square'
  | 'plus square outline'
  | 'qrcode'
  | 'question'
  | 'question circle'
  | 'question circle outline'
  | 'quote left'
  | 'quote right'
  | 'redo'
  | 'redo alternate'
  | 'reply'
  | 'reply all'
  | 'rss'
  | 'rss square'
  | 'save'
  | 'save outline'
  | 'search'
  | 'search minus'
  | 'search plus'
  | 'share'
  | 'share alternate'
  | 'share alternate square'
  | 'share square'
  | 'share square outline'
  | 'shield alternate'
  | 'sign-in'
  | 'sign-out'
  | 'signal'
  | 'sitemap'
  | 'sliders horizontal'
  | 'smile'
  | 'smile outline'
  | 'sort'
  | 'sort alphabet down'
  | 'sort alphabet up'
  | 'sort amount down'
  | 'sort amount up'
  | 'sort down'
  | 'sort numeric down'
  | 'sort numeric up'
  | 'sort up'
  | 'star'
  | 'star outline'
  | 'star half'
  | 'star half outline'
  | 'sync'
  | 'sync alternate'
  | 'thumbs down'
  | 'thumbs down outline'
  | 'thumbs up'
  | 'thumbs up outline'
  | 'times'
  | 'times circle'
  | 'times circle outline'
  | 'toggle off'
  | 'toggle on'
  | 'trash'
  | 'trash alternate'
  | 'trash alternate outline'
  | 'trophy'
  | 'undo'
  | 'undo alternate'
  | 'upload'
  | 'user'
  | 'user outline'
  | 'user circle'
  | 'user circle outline'
  | 'wifi'
  | 'box'
  | 'boxes'
  | 'clipboard check'
  | 'clipboard list'
  | 'dolly'
  | 'dolly flatbed'
  | 'pallet'
  | 'shipping fast'
  | 'truck'
  | 'warehouse'
  | 'ambulance'
  | 'anchor'
  | 'balance scale'
  | 'bath'
  | 'bed'
  | 'beer'
  | 'bell'
  | 'bell outline'
  | 'bell slash'
  | 'bell slash outline'
  | 'bicycle'
  | 'binoculars'
  | 'birthday cake'
  | 'blind'
  | 'bomb'
  | 'book'
  | 'bookmark'
  | 'bookmark outline'
  | 'briefcase'
  | 'building'
  | 'building outline'
  | 'car'
  | 'coffee'
  | 'crosshairs'
  | 'dollar sign'
  | 'eye'
  | 'eye slash'
  | 'eye slash outline'
  | 'fighter jet'
  | 'fire'
  | 'fire extinguisher'
  | 'flag'
  | 'flag outline'
  | 'flag checkered'
  | 'flask'
  | 'gamepad'
  | 'gavel'
  | 'gift'
  | 'glass martini'
  | 'globe'
  | 'graduation cap'
  | 'h square'
  | 'heart'
  | 'heart outline'
  | 'heartbeat'
  | 'home'
  | 'hospital'
  | 'hospital outline'
  | 'image'
  | 'image outline'
  | 'images'
  | 'images outline'
  | 'industry'
  | 'info'
  | 'info circle'
  | 'key'
  | 'leaf'
  | 'lemon'
  | 'lemon outline'
  | 'life ring'
  | 'life ring outline'
  | 'lightbulb'
  | 'lightbulb outline'
  | 'location arrow'
  | 'low vision'
  | 'magnet'
  | 'male'
  | 'map'
  | 'map outline'
  | 'map marker'
  | 'map marker alternate'
  | 'map pin'
  | 'map signs'
  | 'medkit'
  | 'money bill alternate'
  | 'money bill alternate outline'
  | 'motorcycle'
  | 'music'
  | 'newspaper'
  | 'newspaper outline'
  | 'paw'
  | 'phone'
  | 'phone square'
  | 'phone volume'
  | 'plane'
  | 'plug'
  | 'plus'
  | 'plus square'
  | 'plus square outline'
  | 'print'
  | 'recycle'
  | 'road'
  | 'rocket'
  | 'search'
  | 'search minus'
  | 'search plus'
  | 'ship'
  | 'shopping bag'
  | 'shopping basket'
  | 'shopping cart'
  | 'shower'
  | 'street view'
  | 'subway'
  | 'suitcase'
  | 'tag'
  | 'tags'
  | 'taxi'
  | 'thumbtack'
  | 'ticket alternate'
  | 'tint'
  | 'train'
  | 'tree'
  | 'trophy'
  | 'truck'
  | 'tty'
  | 'umbrella'
  | 'university'
  | 'utensil spoon'
  | 'utensils'
  | 'wheelchair'
  | 'wifi'
  | 'wrench'
  | 'ambulance'
  | 'band aid'
  | 'dna'
  | 'first aid'
  | 'heart'
  | 'heart outline'
  | 'heartbeat'
  | 'hospital'
  | 'hospital outline'
  | 'hospital symbol'
  | 'pills'
  | 'plus'
  | 'stethoscope'
  | 'syringe'
  | 'thermometer'
  | 'user md'
  | 'weight'
  | 'ambulance'
  | 'anchor'
  | 'archive'
  | 'balance scale'
  | 'bath'
  | 'bed'
  | 'beer'
  | 'bell'
  | 'bell outline'
  | 'bicycle'
  | 'binoculars'
  | 'birthday cake'
  | 'bomb'
  | 'book'
  | 'bookmark'
  | 'bookmark outline'
  | 'briefcase'
  | 'bug'
  | 'building'
  | 'building outline'
  | 'bullhorn'
  | 'bullseye'
  | 'bus'
  | 'calculator'
  | 'calendar'
  | 'calendar outline'
  | 'calendar alternate'
  | 'calendar alternate outline'
  | 'camera'
  | 'camera retro'
  | 'car'
  | 'clipboard'
  | 'clipboard outline'
  | 'cloud'
  | 'coffee'
  | 'cog'
  | 'cogs'
  | 'compass'
  | 'compass outline'
  | 'copy'
  | 'copy outline'
  | 'cube'
  | 'cubes'
  | 'cut'
  | 'envelope'
  | 'envelope outline'
  | 'envelope open'
  | 'envelope open outline'
  | 'eraser'
  | 'eye'
  | 'eye dropper'
  | 'fax'
  | 'fighter jet'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'film'
  | 'fire'
  | 'fire extinguisher'
  | 'flag'
  | 'flag outline'
  | 'flag checkered'
  | 'flask'
  | 'futbol'
  | 'futbol outline'
  | 'gamepad'
  | 'gavel'
  | 'gem'
  | 'gem outline'
  | 'gift'
  | 'glass martini'
  | 'globe'
  | 'graduation cap'
  | 'hdd'
  | 'hdd outline'
  | 'headphones'
  | 'heart'
  | 'heart outline'
  | 'home'
  | 'hospital'
  | 'hospital outline'
  | 'hourglass'
  | 'hourglass outline'
  | 'image'
  | 'image outline'
  | 'images'
  | 'images outline'
  | 'industry'
  | 'key'
  | 'keyboard'
  | 'keyboard outline'
  | 'laptop'
  | 'leaf'
  | 'lemon'
  | 'lemon outline'
  | 'life ring'
  | 'life ring outline'
  | 'lightbulb'
  | 'lightbulb outline'
  | 'lock'
  | 'lock open'
  | 'magic'
  | 'magnet'
  | 'map'
  | 'map outline'
  | 'map marker'
  | 'map marker alternate'
  | 'map pin'
  | 'map signs'
  | 'medkit'
  | 'microchip'
  | 'microphone'
  | 'mobile'
  | 'mobile alternate'
  | 'money bill alternate'
  | 'money bill alternate outline'
  | 'moon'
  | 'moon outline'
  | 'motorcycle'
  | 'newspaper'
  | 'newspaper outline'
  | 'paint brush'
  | 'paper plane'
  | 'paper plane outline'
  | 'paperclip'
  | 'paste'
  | 'paw'
  | 'pencil alternate'
  | 'phone'
  | 'plane'
  | 'plug'
  | 'print'
  | 'puzzle piece'
  | 'road'
  | 'rocket'
  | 'save'
  | 'save outline'
  | 'search'
  | 'shield alternate'
  | 'shopping bag'
  | 'shopping basket'
  | 'shopping cart'
  | 'shower'
  | 'snowflake'
  | 'snowflake outline'
  | 'space shuttle'
  | 'star'
  | 'star outline'
  | 'sticky note'
  | 'sticky note outline'
  | 'stopwatch'
  | 'subway'
  | 'suitcase'
  | 'sun'
  | 'sun outline'
  | 'tablet'
  | 'tablet alternate'
  | 'tachometer alternate'
  | 'tag'
  | 'tags'
  | 'taxi'
  | 'thumbtack'
  | 'ticket alternate'
  | 'train'
  | 'trash'
  | 'trash alternate'
  | 'trash alternate outline'
  | 'tree'
  | 'trophy'
  | 'truck'
  | 'tv'
  | 'umbrella'
  | 'university'
  | 'unlock'
  | 'unlock alternate'
  | 'utensil spoon'
  | 'utensils'
  | 'wheelchair'
  | 'wrench'
  | 'bell'
  | 'bell outline'
  | 'bookmark'
  | 'bookmark outline'
  | 'bullhorn'
  | 'camera'
  | 'camera retro'
  | 'cart arrow down'
  | 'cart plus'
  | 'certificate'
  | 'credit card'
  | 'credit card outline'
  | 'gem'
  | 'gem outline'
  | 'gift'
  | 'handshake'
  | 'handshake outline'
  | 'heart'
  | 'heart outline'
  | 'key'
  | 'shopping bag'
  | 'shopping basket'
  | 'shopping cart'
  | 'star'
  | 'star outline'
  | 'tag'
  | 'tags'
  | 'thumbs down'
  | 'thumbs down outline'
  | 'thumbs up'
  | 'thumbs up outline'
  | 'trophy'
  | 'bookmark'
  | 'bookmark outline'
  | 'calendar'
  | 'calendar outline'
  | 'certificate'
  | 'circle'
  | 'circle outline'
  | 'cloud'
  | 'comment'
  | 'comment outline'
  | 'file'
  | 'file outline'
  | 'folder'
  | 'folder outline'
  | 'heart'
  | 'heart outline'
  | 'map marker'
  | 'play'
  | 'square'
  | 'square outline'
  | 'star'
  | 'star outline'
  | 'asterisk'
  | 'certificate'
  | 'circle notch'
  | 'cog'
  | 'compass'
  | 'compass outline'
  | 'crosshairs'
  | 'life ring'
  | 'life ring outline'
  | 'snowflake'
  | 'snowflake outline'
  | 'spinner'
  | 'sun'
  | 'sun outline'
  | 'sync'
  | 'baseball ball'
  | 'basketball ball'
  | 'bowling ball'
  | 'football ball'
  | 'futbol'
  | 'futbol outline'
  | 'golf ball'
  | 'hockey puck'
  | 'quidditch'
  | 'table tennis'
  | 'volleyball ball'
  | 'ban'
  | 'battery empty'
  | 'battery full'
  | 'battery half'
  | 'battery quarter'
  | 'battery three quarters'
  | 'bell'
  | 'bell outline'
  | 'bell slash'
  | 'bell slash outline'
  | 'calendar'
  | 'calendar outline'
  | 'calendar alternate'
  | 'calendar alternate outline'
  | 'calendar check'
  | 'calendar check outline'
  | 'calendar minus'
  | 'calendar minus outline'
  | 'calendar plus'
  | 'calendar plus outline'
  | 'calendar times'
  | 'calendar times outline'
  | 'cart arrow down'
  | 'cart plus'
  | 'exclamation'
  | 'exclamation circle'
  | 'exclamation triangle'
  | 'eye'
  | 'eye slash'
  | 'eye slash outline'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'folder'
  | 'folder outline'
  | 'folder open'
  | 'folder open outline'
  | 'info'
  | 'info circle'
  | 'lock'
  | 'lock open'
  | 'minus'
  | 'minus circle'
  | 'minus square'
  | 'minus square outline'
  | 'plus'
  | 'plus circle'
  | 'plus square'
  | 'plus square outline'
  | 'question'
  | 'question circle'
  | 'question circle outline'
  | 'shield alternate'
  | 'shopping cart'
  | 'sign in alternate'
  | 'sign out alternate'
  | 'thermometer empty'
  | 'thermometer full'
  | 'thermometer half'
  | 'thermometer quarter'
  | 'thermometer three quarters'
  | 'thumbs down'
  | 'thumbs down outline'
  | 'thumbs up'
  | 'thumbs up outline'
  | 'toggle off'
  | 'toggle on'
  | 'unlock'
  | 'unlock alternate'
  | 'address book'
  | 'address book outline'
  | 'address card'
  | 'address card outline'
  | 'bed'
  | 'blind'
  | 'child'
  | 'female'
  | 'frown'
  | 'frown outline'
  | 'id badge'
  | 'id badge outline'
  | 'id card'
  | 'id card outline'
  | 'male'
  | 'meh'
  | 'meh outline'
  | 'power off'
  | 'smile'
  | 'smile outline'
  | 'street view'
  | 'user'
  | 'user outline'
  | 'user circle'
  | 'user circle outline'
  | 'user md'
  | 'user plus'
  | 'user secret'
  | 'user times'
  | 'users'
  | 'wheelchair'
  | 'ambulance'
  | 'bicycle'
  | 'bus'
  | 'car'
  | 'fighter jet'
  | 'motorcycle'
  | 'paper plane'
  | 'paper plane outline'
  | 'plane'
  | 'rocket'
  | 'ship'
  | 'shopping cart'
  | 'space shuttle'
  | 'subway'
  | 'taxi'
  | 'train'
  | 'truck'
  | 'wheelchair'
  | 'archive'
  | 'book'
  | 'bookmark'
  | 'bookmark outline'
  | 'edit'
  | 'edit outline'
  | 'envelope'
  | 'envelope outline'
  | 'envelope open'
  | 'envelope open outline'
  | 'eraser'
  | 'file'
  | 'file outline'
  | 'file alternate'
  | 'file alternate outline'
  | 'folder'
  | 'folder outline'
  | 'folder open'
  | 'folder open outline'
  | 'keyboard'
  | 'keyboard outline'
  | 'newspaper'
  | 'newspaper outline'
  | 'paper plane'
  | 'paper plane outline'
  | 'paperclip'
  | 'paragraph'
  | 'pen square'
  | 'pencil alternate'
  | 'quote left'
  | 'quote right'
  | 'sticky note'
  | 'sticky note outline'
  | 'thumbtack'
  | '500px'
  | 'accessible'
  | 'accusoft'
  | 'adn'
  | 'adversal'
  | 'affiliatetheme'
  | 'algolia'
  | 'amazon'
  | 'amazon pay'
  | 'amilia'
  | 'android'
  | 'angellist'
  | 'angrycreative'
  | 'angular'
  | 'app store'
  | 'app store ios'
  | 'apper'
  | 'apple'
  | 'apple pay'
  | 'asymmetrik'
  | 'audible'
  | 'autoprefixer'
  | 'avianex'
  | 'aviato'
  | 'aws'
  | 'bandcamp'
  | 'behance'
  | 'behance square'
  | 'bimobject'
  | 'bitbucket'
  | 'bitcoin'
  | 'bity'
  | 'black tie'
  | 'blackberry'
  | 'blogger'
  | 'blogger b'
  | 'bluetooth'
  | 'bluetooth b'
  | 'btc'
  | 'buromobelexperte'
  | 'buysellads'
  | 'cc amazon pay'
  | 'cc amex'
  | 'cc apple pay'
  | 'cc diners club'
  | 'cc discover'
  | 'cc jcb'
  | 'cc mastercard'
  | 'cc paypal'
  | 'cc stripe'
  | 'cc visa'
  | 'centercode'
  | 'chrome'
  | 'cloudscale'
  | 'cloudsmith'
  | 'cloudversify'
  | 'codepen'
  | 'codiepie'
  | 'connectdevelop'
  | 'contao'
  | 'cpanel'
  | 'creative commons'
  | 'css3'
  | 'css3 alternate'
  | 'cuttlefish'
  | 'd and d'
  | 'dashcube'
  | 'delicious'
  | 'deploydog'
  | 'deskpro'
  | 'deviantart'
  | 'digg'
  | 'digital ocean'
  | 'discord'
  | 'discourse'
  | 'dochub'
  | 'docker'
  | 'draft2digital'
  | 'dribbble'
  | 'dribbble square'
  | 'dropbox'
  | 'drupal'
  | 'dyalog'
  | 'earlybirds'
  | 'edge'
  | 'elementor'
  | 'ember'
  | 'empire'
  | 'envira'
  | 'erlang'
  | 'ethereum'
  | 'etsy'
  | 'expeditedssl'
  | 'facebook'
  | 'facebook f'
  | 'facebook messenger'
  | 'facebook square'
  | 'firefox'
  | 'first order'
  | 'firstdraft'
  | 'flickr'
  | 'flipboard'
  | 'fly'
  | 'font awesome'
  | 'font awesome alternate'
  | 'font awesome flag'
  | 'fonticons'
  | 'fonticons fi'
  | 'fort awesome'
  | 'fort awesome alternate'
  | 'forumbee'
  | 'foursquare'
  | 'free code camp'
  | 'freebsd'
  | 'get pocket'
  | 'gg'
  | 'gg circle'
  | 'git'
  | 'git square'
  | 'github'
  | 'github alternate'
  | 'github square'
  | 'gitkraken'
  | 'gitlab'
  | 'gitter'
  | 'glide'
  | 'glide g'
  | 'gofore'
  | 'goodreads'
  | 'goodreads g'
  | 'google'
  | 'google drive'
  | 'google play'
  | 'google plus'
  | 'google plus g'
  | 'google plus square'
  | 'google wallet'
  | 'gratipay'
  | 'grav'
  | 'gripfire'
  | 'grunt'
  | 'gulp'
  | 'hacker news'
  | 'hacker news square'
  | 'hips'
  | 'hire a helper'
  | 'hooli'
  | 'hotjar'
  | 'houzz'
  | 'html5'
  | 'hubspot'
  | 'imdb'
  | 'instagram'
  | 'internet explorer'
  | 'ioxhost'
  | 'itunes'
  | 'itunes note'
  | 'jenkins'
  | 'joget'
  | 'joomla'
  | 'js'
  | 'js square'
  | 'jsfiddle'
  | 'keycdn'
  | 'kickstarter'
  | 'kickstarter k'
  | 'korvue'
  | 'laravel'
  | 'lastfm'
  | 'lastfm square'
  | 'leanpub'
  | 'less'
  | 'linechat'
  | 'linkedin'
  | 'linkedin alternate'
  | 'linode'
  | 'linux'
  | 'lyft'
  | 'magento'
  | 'maxcdn'
  | 'medapps'
  | 'medium'
  | 'medium m'
  | 'medrt'
  | 'meetup'
  | 'microsoft'
  | 'mix'
  | 'mixcloud'
  | 'mizuni'
  | 'modx'
  | 'monero'
  | 'napster'
  | 'nintendo switch'
  | 'node'
  | 'node js'
  | 'npm'
  | 'ns8'
  | 'nutritionix'
  | 'odnoklassniki'
  | 'odnoklassniki square'
  | 'opencart'
  | 'openid'
  | 'opera'
  | 'optin monster'
  | 'osi'
  | 'page4'
  | 'pagelines'
  | 'palfed'
  | 'patreon'
  | 'paypal'
  | 'periscope'
  | 'phabricator'
  | 'phoenix framework'
  | 'php'
  | 'pied piper'
  | 'pied piper alternate'
  | 'pied piper pp'
  | 'pinterest'
  | 'pinterest p'
  | 'pinterest square'
  | 'playstation'
  | 'product hunt'
  | 'pushed'
  | 'python'
  | 'qq'
  | 'quinscape'
  | 'quora'
  | 'ravelry'
  | 'react'
  | 'rebel'
  | 'redriver'
  | 'reddit'
  | 'reddit alien'
  | 'reddit square'
  | 'rendact'
  | 'renren'
  | 'replyd'
  | 'resolving'
  | 'rocketchat'
  | 'rockrms'
  | 'safari'
  | 'sass'
  | 'schlix'
  | 'scribd'
  | 'searchengin'
  | 'sellcast'
  | 'sellsy'
  | 'servicestack'
  | 'shirtsinbulk'
  | 'simplybuilt'
  | 'sistrix'
  | 'skyatlas'
  | 'skype'
  | 'slack'
  | 'slack hash'
  | 'slideshare'
  | 'snapchat'
  | 'snapchat ghost'
  | 'snapchat square'
  | 'soundcloud'
  | 'speakap'
  | 'spotify'
  | 'stack exchange'
  | 'stack overflow'
  | 'staylinked'
  | 'steam'
  | 'steam square'
  | 'steam symbol'
  | 'sticker mule'
  | 'strava'
  | 'stripe'
  | 'stripe s'
  | 'studiovinari'
  | 'stumbleupon'
  | 'stumbleupon circle'
  | 'superpowers'
  | 'supple'
  | 'telegram'
  | 'telegram plane'
  | 'tencent weibo'
  | 'themeisle'
  | 'trello'
  | 'tripadvisor'
  | 'tumblr'
  | 'tumblr square'
  | 'twitch'
  | 'twitter'
  | 'twitter square'
  | 'typo3'
  | 'uber'
  | 'uikit'
  | 'uniregistry'
  | 'untappd'
  | 'usb'
  | 'ussunnah'
  | 'vaadin'
  | 'viacoin'
  | 'viadeo'
  | 'viadeo square'
  | 'viber'
  | 'vimeo'
  | 'vimeo square'
  | 'vimeo v'
  | 'vine'
  | 'vk'
  | 'vnv'
  | 'vuejs'
  | 'wechat'
  | 'weibo'
  | 'weixin'
  | 'whatsapp'
  | 'whatsapp square'
  | 'whmcs'
  | 'wikipedia w'
  | 'windows'
  | 'wordpress'
  | 'wordpress simple'
  | 'wpbeginner'
  | 'wpexplorer'
  | 'wpforms'
  | 'xbox'
  | 'xing'
  | 'xing square'
  | 'y combinator'
  | 'yahoo'
  | 'yandex'
  | 'yandex international'
  | 'yelp'
  | 'yoast'
  | 'youtube'
  | 'youtube square'
  | 'chess rock'
  | 'ordered list'
  | 'unordered list'
  | 'user doctor'
  | 'shield'
  | 'puzzle'
  | 'add circle'
  | 'add square'
  | 'add to calendar'
  | 'add to cart'
  | 'add user'
  | 'add'
  | 'alarm mute'
  | 'alarm'
  | 'ald'
  | 'als'
  | 'announcement'
  | 'area chart'
  | 'area graph'
  | 'arrow down cart'
  | 'asexual'
  | 'asl interpreting'
  | 'asl'
  | 'assistive listening devices'
  | 'attach'
  | 'attention'
  | 'balance'
  | 'bar'
  | 'bathtub'
  | 'battery four'
  | 'battery high'
  | 'battery low'
  | 'battery one'
  | 'battery three'
  | 'battery two'
  | 'battery zero'
  | 'birthday'
  | 'block layout'
  | 'bluetooth alternative'
  | 'broken chain'
  | 'browser'
  | 'call square'
  | 'call'
  | 'cancel'
  | 'cart'
  | 'cc'
  | 'chain'
  | 'chat'
  | 'checked calendar'
  | 'checkmark'
  | 'circle notched'
  | 'close'
  | 'cny'
  | 'cocktail'
  | 'commenting'
  | 'computer'
  | 'configure'
  | 'content'
  | 'deafness'
  | 'delete calendar'
  | 'delete'
  | 'detective'
  | 'discussions'
  | 'doctor'
  | 'dollar'
  | 'dont'
  | 'drivers license'
  | 'dropdown'
  | 'emergency'
  | 'envira gallery'
  | 'erase'
  | 'eur'
  | 'euro'
  | 'eyedropper'
  | 'factory'
  | 'favorite'
  | 'feed'
  | 'female homosexual'
  | 'file text'
  | 'file text outline'
  | 'find'
  | 'first aid'
  | 'fork'
  | 'game'
  | 'gay'
  | 'gbp'
  | 'google plus circle'
  | 'google plus official'
  | 'grab'
  | 'graduation'
  | 'grid layout'
  | 'group'
  | 'h'
  | 'hand victory'
  | 'handicap'
  | 'hard of hearing'
  | 'header'
  | 'help circle'
  | 'help'
  | 'heterosexual'
  | 'hide'
  | 'hotel'
  | 'hourglass four'
  | 'hourglass full'
  | 'hourglass one'
  | 'hourglass three'
  | 'hourglass two'
  | 'idea'
  | 'ils'
  | 'in cart'
  | 'inr'
  | 'intergender'
  | 'intersex'
  | 'jpy'
  | 'krw'
  | 'lab'
  | 'law'
  | 'legal'
  | 'lesbian'
  | 'lightning'
  | 'like'
  | 'line graph'
  | 'linkedin square'
  | 'linkify'
  | 'lira'
  | 'list layout'
  | 'magnify'
  | 'mail forward'
  | 'mail outline'
  | 'mail square'
  | 'mail'
  | 'male homosexual'
  | 'man'
  | 'marker'
  | 'mars alternate'
  | 'mars horizontal'
  | 'mars vertical'
  | 'microsoft edge'
  | 'military'
  | 'ms edge'
  | 'mute'
  | 'new pied piper'
  | 'non binary transgender'
  | 'numbered list'
  | 'options'
  | 'other gender horizontal'
  | 'other gender vertical'
  | 'other gender'
  | 'payment'
  | 'paypal card'
  | 'pencil square'
  | 'photo'
  | 'picture'
  | 'pie chart'
  | 'pie graph'
  | 'pied piper hat'
  | 'pin'
  | 'plus cart'
  | 'point'
  | 'pointing down'
  | 'pointing left'
  | 'pointing right'
  | 'pointing up'
  | 'pound'
  | 'power cord'
  | 'power'
  | 'privacy'
  | 'r circle'
  | 'rain'
  | 'record'
  | 'refresh'
  | 'remove circle'
  | 'remove from calendar'
  | 'remove user'
  | 'remove'
  | 'repeat'
  | 'rmb'
  | 'rouble'
  | 'rub'
  | 'ruble'
  | 'rupee'
  | 's15'
  | 'selected radio'
  | 'send'
  | 'setting'
  | 'settings'
  | 'shekel'
  | 'sheqel'
  | 'shipping'
  | 'shop'
  | 'shuffle'
  | 'shutdown'
  | 'sidebar'
  | 'signing'
  | 'signup'
  | 'sliders'
  | 'soccer'
  | 'sort alphabet ascending'
  | 'sort alphabet descending'
  | 'sort ascending'
  | 'sort content ascending'
  | 'sort content descending'
  | 'sort descending'
  | 'sort numeric ascending'
  | 'sort numeric descending'
  | 'sound'
  | 'spy'
  | 'stripe card'
  | 'student'
  | 'talk'
  | 'target'
  | 'teletype'
  | 'television'
  | 'text cursor'
  | 'text telephone'
  | 'theme'
  | 'thermometer'
  | 'thumb tack'
  | 'time'
  | 'tm'
  | 'toggle down'
  | 'toggle left'
  | 'toggle right'
  | 'toggle up'
  | 'translate'
  | 'travel'
  | 'treatment'
  | 'triangle down'
  | 'triangle left'
  | 'triangle right'
  | 'triangle up'
  | 'try'
  | 'unhide'
  | 'unlinkify'
  | 'unmute'
  | 'usd'
  | 'user cancel'
  | 'user close'
  | 'user delete'
  | 'user x'
  | 'vcard'
  | 'video camera'
  | 'video play'
  | 'volume control phone'
  | 'wait'
  | 'warning circle'
  | 'warning sign'
  | 'warning'
  | 'wi-fi'
  | 'winner'
  | 'wizard'
  | 'woman'
  | 'won'
  | 'wordpress beginner'
  | 'wordpress forms'
  | 'world'
  | 'write square'
  | 'x'
  | 'yen'
  | 'zip'
  | 'zoom in'
  | 'zoom out'
  | 'zoom'
  | 'bitbucket square'
  | 'checkmark box'
  | 'circle thin'
  | 'cloud download'
  | 'cloud upload'
  | 'compose'
  | 'conversation'
  | 'credit card alternative'
  | 'currency'
  | 'dashboard'
  | 'diamond'
  | 'disk'
  | 'exchange'
  | 'external share'
  | 'external square'
  | 'external'
  | 'facebook official'
  | 'food'
  | 'hourglass zero'
  | 'level down'
  | 'level up'
  | 'log out'
  | 'meanpath'
  | 'money'
  | 'move'
  | 'pencil'
  | 'protect'
  | 'radio'
  | 'remove bookmark'
  | 'resize horizontal'
  | 'resize vertical'
  | 'sign in'
  | 'sign out'
  | 'spoon'
  | 'star half empty'
  | 'star half full'
  | 'ticket'
  | 'times rectangle'
  | 'write'
  | 'youtube play'
````

## File: index.js/index.js
````javascript
export Confirm from './addons/Confirm'
export Pagination from './addons/Pagination'
export PaginationItem from './addons/Pagination/PaginationItem'
export Portal from './addons/Portal'
export PortalInner from './addons/Portal/PortalInner'
export Radio from './addons/Radio'
export Select from './addons/Select'
export TextArea from './addons/TextArea'
export TransitionablePortal from './addons/TransitionablePortal'
export Breadcrumb from './collections/Breadcrumb'
export BreadcrumbDivider from './collections/Breadcrumb/BreadcrumbDivider'
export BreadcrumbSection from './collections/Breadcrumb/BreadcrumbSection'
export Form from './collections/Form'
export FormButton from './collections/Form/FormButton'
export FormCheckbox from './collections/Form/FormCheckbox'
export FormDropdown from './collections/Form/FormDropdown'
export FormField from './collections/Form/FormField'
export FormGroup from './collections/Form/FormGroup'
export FormInput from './collections/Form/FormInput'
export FormRadio from './collections/Form/FormRadio'
export FormSelect from './collections/Form/FormSelect'
export FormTextArea from './collections/Form/FormTextArea'
export Grid from './collections/Grid'
export GridColumn from './collections/Grid/GridColumn'
export GridRow from './collections/Grid/GridRow'
export Menu from './collections/Menu'
export MenuHeader from './collections/Menu/MenuHeader'
export MenuItem from './collections/Menu/MenuItem'
export MenuMenu from './collections/Menu/MenuMenu'
export Message from './collections/Message'
export MessageContent from './collections/Message/MessageContent'
export MessageHeader from './collections/Message/MessageHeader'
export MessageItem from './collections/Message/MessageItem'
export MessageList from './collections/Message/MessageList'
export Table from './collections/Table'
export TableBody from './collections/Table/TableBody'
export TableCell from './collections/Table/TableCell'
export TableFooter from './collections/Table/TableFooter'
export TableHeader from './collections/Table/TableHeader'
export TableHeaderCell from './collections/Table/TableHeaderCell'
export TableRow from './collections/Table/TableRow'
export Button from './elements/Button/Button'
export ButtonContent from './elements/Button/ButtonContent'
export ButtonGroup from './elements/Button/ButtonGroup'
export ButtonOr from './elements/Button/ButtonOr'
export Container from './elements/Container'
export Divider from './elements/Divider'
export Flag from './elements/Flag'
export Header from './elements/Header'
export HeaderContent from './elements/Header/HeaderContent'
export HeaderSubheader from './elements/Header/HeaderSubheader'
export Icon from './elements/Icon'
export IconGroup from './elements/Icon/IconGroup'
export Image from './elements/Image'
export ImageGroup from './elements/Image/ImageGroup'
export Input from './elements/Input'
export Label from './elements/Label'
export LabelDetail from './elements/Label/LabelDetail'
export LabelGroup from './elements/Label/LabelGroup'
export List from './elements/List'
export ListContent from './elements/List/ListContent'
export ListDescription from './elements/List/ListDescription'
export ListHeader from './elements/List/ListHeader'
export ListIcon from './elements/List/ListIcon'
export ListItem from './elements/List/ListItem'
export ListList from './elements/List/ListList'
export Loader from './elements/Loader'
export Placeholder from './elements/Placeholder'
export PlaceholderHeader from './elements/Placeholder/PlaceholderHeader'
export PlaceholderImage from './elements/Placeholder/PlaceholderImage'
export PlaceholderLine from './elements/Placeholder/PlaceholderLine'
export PlaceholderParagraph from './elements/Placeholder/PlaceholderParagraph'
export Rail from './elements/Rail'
export Reveal from './elements/Reveal'
export RevealContent from './elements/Reveal/RevealContent'
export Segment from './elements/Segment'
export SegmentGroup from './elements/Segment/SegmentGroup'
export SegmentInline from './elements/Segment/SegmentInline'
export Step from './elements/Step'
export StepContent from './elements/Step/StepContent'
export StepDescription from './elements/Step/StepDescription'
export StepGroup from './elements/Step/StepGroup'
export StepTitle from './elements/Step/StepTitle'
export Accordion from './modules/Accordion/Accordion'
export AccordionAccordion from './modules/Accordion/AccordionAccordion'
export AccordionContent from './modules/Accordion/AccordionContent'
export AccordionPanel from './modules/Accordion/AccordionPanel'
export AccordionTitle from './modules/Accordion/AccordionTitle'
export Checkbox from './modules/Checkbox'
export Dimmer from './modules/Dimmer'
export DimmerDimmable from './modules/Dimmer/DimmerDimmable'
export DimmerInner from './modules/Dimmer/DimmerInner'
export Dropdown from './modules/Dropdown'
export DropdownDivider from './modules/Dropdown/DropdownDivider'
export DropdownHeader from './modules/Dropdown/DropdownHeader'
export DropdownItem from './modules/Dropdown/DropdownItem'
export DropdownMenu from './modules/Dropdown/DropdownMenu'
export DropdownSearchInput from './modules/Dropdown/DropdownSearchInput'
export DropdownText from './modules/Dropdown/DropdownText'
export Embed from './modules/Embed'
export Modal from './modules/Modal'
export ModalActions from './modules/Modal/ModalActions'
export ModalContent from './modules/Modal/ModalContent'
export ModalDescription from './modules/Modal/ModalDescription'
export ModalDimmer from './modules/Modal/ModalDimmer'
export ModalHeader from './modules/Modal/ModalHeader'
export Popup from './modules/Popup'
export PopupContent from './modules/Popup/PopupContent'
export PopupHeader from './modules/Popup/PopupHeader'
export Progress from './modules/Progress'
export Rating from './modules/Rating'
export RatingIcon from './modules/Rating/RatingIcon'
export Search from './modules/Search'
export SearchCategory from './modules/Search/SearchCategory'
export SearchCategoryLayout from './modules/Search/SearchCategoryLayout'
export SearchResult from './modules/Search/SearchResult'
export SearchResults from './modules/Search/SearchResults'
export Sidebar from './modules/Sidebar'
export SidebarPushable from './modules/Sidebar/SidebarPushable'
export SidebarPusher from './modules/Sidebar/SidebarPusher'
export Sticky from './modules/Sticky'
export Tab from './modules/Tab'
export TabPane from './modules/Tab/TabPane'
export Transition from './modules/Transition'
export TransitionGroup from './modules/Transition/TransitionGroup'
export Advertisement from './views/Advertisement'
export Card from './views/Card/Card'
export CardContent from './views/Card/CardContent'
export CardDescription from './views/Card/CardDescription'
export CardGroup from './views/Card/CardGroup'
export CardHeader from './views/Card/CardHeader'
export CardMeta from './views/Card/CardMeta'
export Comment from './views/Comment'
export CommentAction from './views/Comment/CommentAction'
export CommentActions from './views/Comment/CommentActions'
export CommentAuthor from './views/Comment/CommentAuthor'
export CommentAvatar from './views/Comment/CommentAvatar'
export CommentContent from './views/Comment/CommentContent'
export CommentGroup from './views/Comment/CommentGroup'
export CommentMetadata from './views/Comment/CommentMetadata'
export CommentText from './views/Comment/CommentText'
export Feed from './views/Feed'
export FeedContent from './views/Feed/FeedContent'
export FeedDate from './views/Feed/FeedDate'
export FeedEvent from './views/Feed/FeedEvent'
export FeedExtra from './views/Feed/FeedExtra'
export FeedLabel from './views/Feed/FeedLabel'
export FeedLike from './views/Feed/FeedLike'
export FeedMeta from './views/Feed/FeedMeta'
export FeedSummary from './views/Feed/FeedSummary'
export FeedUser from './views/Feed/FeedUser'
export Item from './views/Item'
export ItemContent from './views/Item/ItemContent'
export ItemDescription from './views/Item/ItemDescription'
export ItemExtra from './views/Item/ItemExtra'
export ItemGroup from './views/Item/ItemGroup'
export ItemHeader from './views/Item/ItemHeader'
export ItemImage from './views/Item/ItemImage'
export ItemMeta from './views/Item/ItemMeta'
export Statistic from './views/Statistic'
export StatisticGroup from './views/Statistic/StatisticGroup'
export StatisticLabel from './views/Statistic/StatisticLabel'
export StatisticValue from './views/Statistic/StatisticValue'
````

## File: lib/childrenUtils.js/childrenUtils.js
````javascript
import _ from 'lodash'
import { Children } from 'react'
export const someByType = (children, type) => _.some(Children.toArray(children), { type })
export const findByType = (children, type) => _.find(Children.toArray(children), { type })
export const isNil = (children) =>
  children === null || children === undefined || (Array.isArray(children) && children.length === 0)
````

## File: lib/classNameBuilders.js/classNameBuilders.js
````javascript
import { numberToWord } from './numberToWord'
export const getKeyOnly = (val, key) => val && key
export const getValueAndKey = (val, key) => val && val !== true && `${val} ${key}`
export const getKeyOrValueAndKey = (val, key) => val && (val === true ? key : `${val} ${key}`)
export const getMultipleProp = (val, key) => {
  if (!val || val === true) return null
  return val
    .replace('large screen', 'large-screen')
    .replace(/ vertically/g, '-vertically')
    .split(' ')
    .map((prop) => `${prop.replace('-', ' ')} ${key}`)
    .join(' ')
}
export const getTextAlignProp = (val) =>
  val === 'justified' ? 'justified' : getValueAndKey(val, 'aligned')
export const getVerticalAlignProp = (val) => getValueAndKey(val, 'aligned')
export const getWidthProp = (val, widthClass = '', canEqual = false) => {
  if (canEqual && val === 'equal') {
    return 'equal width'
  }
  const valType = typeof val
  if ((valType === 'string' || valType === 'number') && widthClass) {
    return `${numberToWord(val)} ${widthClass}`
  }
  return numberToWord(val)
}
````

## File: lib/createPaginationItems/createPaginationItems.js/createPaginationItems.js
````javascript
import {
  createFirstPage,
  createLastItem,
  createNextItem,
  createPageFactory,
  createPrevItem,
} from './itemFactories'
import { createComplexRange, createSimpleRange } from './rangeFactories'
import { isSimplePagination, typifyOptions } from './paginationUtils'
const createPaginationItems = (rawOptions) => {
  const options = typifyOptions(rawOptions)
  const { activePage, totalPages } = options
  const pageFactory = createPageFactory(activePage)
  const innerRange = isSimplePagination(options)
    ? createSimpleRange(1, totalPages, pageFactory)
    : createComplexRange(options, pageFactory)
  return [
    createFirstPage(),
    createPrevItem(activePage),
    ...innerRange,
    createNextItem(activePage, totalPages),
    createLastItem(totalPages),
  ]
}
export default createPaginationItems
````

## File: lib/createPaginationItems/index.js/index.js
````javascript
export default from './createPaginationItems'
````

## File: lib/createPaginationItems/itemFactories.js/itemFactories.js
````javascript
export const createEllipsisItem = (pageNumber) => ({
  active: false,
  type: 'ellipsisItem',
  value: pageNumber,
})
export const createFirstPage = () => ({
  active: false,
  type: 'firstItem',
  value: 1,
})
export const createPrevItem = (activePage) => ({
  active: false,
  type: 'prevItem',
  value: Math.max(1, activePage - 1),
})
export const createPageFactory = (activePage) => (pageNumber) => ({
  active: activePage === pageNumber,
  type: 'pageItem',
  value: pageNumber,
})
export const createNextItem = (activePage, totalPages) => ({
  active: false,
  type: 'nextItem',
  value: Math.min(activePage + 1, totalPages),
})
export const createLastItem = (totalPages) => ({
  active: false,
  type: 'lastItem',
  value: totalPages,
})
````

## File: lib/createPaginationItems/paginationUtils.js/paginationUtils.js
````javascript
export const isSimplePagination = ({ boundaryRange, hideEllipsis, siblingRange, totalPages }) => {
  const boundaryRangeSize = 2 * boundaryRange
  const ellipsisSize = hideEllipsis ? 0 : 2
  const siblingRangeSize = 2 * siblingRange
  return 1 + ellipsisSize + siblingRangeSize + boundaryRangeSize >= totalPages
}
export const typifyOptions = ({
  activePage,
  boundaryRange,
  hideEllipsis,
  siblingRange,
  totalPages,
}) => ({
  activePage: +activePage,
  boundaryRange: +boundaryRange,
  hideEllipsis: !!hideEllipsis,
  siblingRange: +siblingRange,
  totalPages: +totalPages,
})
````

## File: lib/createPaginationItems/rangeFactories.js/rangeFactories.js
````javascript
import _ from 'lodash'
import { createInnerPrefix, createInnerSuffix } from './suffixFactories'
export const createSimpleRange = (start, end, pageFactory) =>
  _.map(_.range(start, end + 1), pageFactory)
export const createComplexRange = (options, pageFactory) => {
  const { activePage, boundaryRange, hideEllipsis, siblingRange, totalPages } = options
  const ellipsisSize = hideEllipsis ? 0 : 1
  const firstGroupEnd = boundaryRange
  const firstGroup = createSimpleRange(1, firstGroupEnd, pageFactory)
  const lastGroupStart = totalPages + 1 - boundaryRange
  const lastGroup = createSimpleRange(lastGroupStart, totalPages, pageFactory)
  const innerGroupStart = Math.min(
    Math.max(activePage - siblingRange, firstGroupEnd + ellipsisSize + 1),
    lastGroupStart - ellipsisSize - 2 * siblingRange - 1,
  )
  const innerGroupEnd = innerGroupStart + 2 * siblingRange
  const innerGroup = createSimpleRange(innerGroupStart, innerGroupEnd, pageFactory)
  return [
    ...firstGroup,
    !hideEllipsis && createInnerPrefix(firstGroupEnd, innerGroupStart, pageFactory),
    ...innerGroup,
    !hideEllipsis && createInnerSuffix(innerGroupEnd, lastGroupStart, pageFactory),
    ...lastGroup,
  ].filter(Boolean)
}
````

## File: lib/createPaginationItems/suffixFactories.js/suffixFactories.js
````javascript
import { createEllipsisItem } from './itemFactories'
export const createInnerPrefix = (firstGroupEnd, innerGroupStart, pageFactory) => {
  const prefixPage = innerGroupStart - 1
  const showEllipsis = prefixPage !== firstGroupEnd + 1
  const prefixFactory = showEllipsis ? createEllipsisItem : pageFactory
  return prefixFactory(prefixPage)
}
export const createInnerSuffix = (innerGroupEnd, lastGroupStart, pageFactory) => {
  const suffixPage = innerGroupEnd + 1
  const showEllipsis = suffixPage !== lastGroupStart - 1
  const suffixFactory = showEllipsis ? createEllipsisItem : pageFactory
  return suffixFactory(suffixPage)
}
````

## File: lib/customPropTypes.js/customPropTypes.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import leven from './leven'
const typeOf = (...args) => Object.prototype.toString.call(...args)
export const domNode = (props, propName) => {
  if (props[propName] === undefined) return
  if (typeof Element === 'undefined') return
  if (props[propName] instanceof Element) return
  return new Error(`Invalid prop "${propName}" supplied, expected a DOM node.`)
}
export const suggest = (suggestions) => {
  if (!Array.isArray(suggestions)) {
    throw new Error('Invalid argument supplied to suggest, expected an instance of array.')
  }
  const findBestSuggestions = _.memoize((str) => {
    const propValueWords = str.split(' ')
    return _.take(
      _.sortBy(
        _.map(suggestions, (suggestion) => {
          const suggestionWords = suggestion.split(' ')
          const propValueScore = _.sum(
            _.map(
              _.map(propValueWords, (x) => _.map(suggestionWords, (y) => leven(x, y))),
              _.min,
            ),
          )
          const suggestionScore = _.sum(
            _.map(
              _.map(suggestionWords, (x) => _.map(propValueWords, (y) => leven(x, y))),
              _.min,
            ),
          )
          return { suggestion, score: propValueScore + suggestionScore }
        }),
        ['score', 'suggestion'],
      ),
      3,
    )
  })
  const suggestionsLookup = suggestions.reduce((acc, key) => {
    acc[key.split(' ').sort().join(' ')] = true
    return acc
  }, {})
  return (props, propName, componentName) => {
    const propValue = props[propName]
    if (!propValue || suggestionsLookup[propValue]) return
    const propValueSorted = propValue.split(' ').sort().join(' ')
    if (suggestionsLookup[propValueSorted]) return
    const bestMatches = findBestSuggestions(propValue)
    if (bestMatches.some((x) => x.score === 0)) return
    return new Error(
      [
        `Invalid prop \`${propName}\` of value \`${propValue}\` supplied to \`${componentName}\`.`,
        `\n\nInstead of \`${propValue}\`, did you mean:`,
        bestMatches.map((x) => `\n  - ${x.suggestion}`).join(''),
        '\n',
      ].join(''),
    )
  }
}
/**
 * Disallow other props from being defined with this prop.
 * @param {string[]} disallowedProps An array of props that cannot be used with this prop.
 */
export const disallow = (disallowedProps) => (props, propName, componentName) => {
  if (!Array.isArray(disallowedProps)) {
    throw new Error(
      [
        'Invalid argument supplied to disallow, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    )
  }
  // skip if prop is undefined
  if (_.isNil(props[propName]) || props[propName] === false) {
    return
  }
  // find disallowed props with values
  const disallowed = disallowedProps.reduce((acc, disallowedProp) => {
    if (!_.isNil(props[disallowedProp]) && props[disallowedProp] !== false) {
      return [...acc, disallowedProp]
    }
    return acc
  }, [])
  if (disallowed.length > 0) {
    return new Error(
      [
        `Prop \`${propName}\` in \`${componentName}\` conflicts with props: \`${disallowed.join(
          '`, `',
        )}\`.`,
        'They cannot be defined together, choose one or the other.',
      ].join(' '),
    )
  }
}
/**
 * Ensure a prop adherers to multiple prop type validators.
 * @param {function[]} validators An array of propType functions.
 */
export const every = (validators) => (props, propName, componentName, ...rest) => {
  if (!Array.isArray(validators)) {
    throw new Error(
      [
        'Invalid argument supplied to every, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }
  const errors = []
  validators.forEach((validator) => {
    if (typeof validator !== 'function') {
      throw new Error(
        `every() argument "validators" should contain functions, found: ${typeOf(validator)}.`,
      )
    }
    const error = validator(props, propName, componentName, ...rest)
    if (error) {
      errors.push(error)
    }
  })
  return errors[0]
}
export const givenProps = (propsShape, validator) => (props, propName, componentName, ...rest) => {
  if (!_.isPlainObject(propsShape)) {
    throw new Error(
      [
        'Invalid argument supplied to givenProps, expected an object.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }
  if (typeof validator !== 'function') {
    throw new Error(
      [
        'Invalid argument supplied to givenProps, expected a function.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }
  const shouldValidate = _.keys(propsShape).every((key) => {
    const val = propsShape[key]
    return typeof val === 'function'
      ? !val(props, key, componentName, ...rest)
      : val === props[propName]
  })
  if (!shouldValidate) return
  const error = validator(props, propName, componentName, ...rest)
  if (error) {
    const prettyProps = `{ ${_.keys(_.pick(_.keys(propsShape), props))
      .map((key) => {
        const val = props[key]
        let renderedValue = val
        if (typeof val === 'string') renderedValue = `"${val}"`
        else if (Array.isArray(val)) renderedValue = `[${val.join(', ')}]`
        else if (_.isObject(val)) renderedValue = '{...}'
        return `${key}: ${renderedValue}`
      })
      .join(', ')} }`
    error.message = `Given props ${prettyProps}: ${error.message}`
    return error
  }
}
export const demand = (requiredProps) => (props, propName, componentName) => {
  if (!Array.isArray(requiredProps)) {
    throw new Error(
      [
        'Invalid `requiredProps` argument supplied to require, expected an instance of array.',
        ` See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(''),
    )
  }
  // skip if prop is undefined
  if (props[propName] === undefined) return
  const missingRequired = requiredProps.filter((requiredProp) => props[requiredProp] === undefined)
  if (missingRequired.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` requires props: \`${missingRequired.join(
        '`, `',
      )}\`.`,
    )
  }
}
/**
 * Ensure an multiple prop contains a string with only possible values.
 * @param {string[]} possible An array of possible values to prop.
 */
export const multipleProp = (possible) => (props, propName, componentName) => {
  if (!Array.isArray(possible)) {
    throw new Error(
      [
        'Invalid argument supplied to some, expected an instance of array.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }
  const propValue = props[propName]
  // skip if prop is undefined
  if (_.isNil(propValue) || propValue === false) return
  const values = propValue
    .replace('large screen', 'large-screen')
    .replace(/ vertically/g, '-vertically')
    .split(' ')
    .map((val) => _.trim(val).replace('-', ' '))
  const invalid = _.difference(values, possible)
  if (invalid.length > 0) {
    return new Error(
      `\`${propName}\` prop in \`${componentName}\` has invalid values: \`${invalid.join(
        '`, `',
      )}\`.`,
    )
  }
}
export const contentShorthand = (...args) =>
  every([disallow(['children']), PropTypes.node])(...args)
export const itemShorthand = (...args) =>
  every([
    disallow(['children']),
    PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object])),
    ]),
  ])(...args)
export const collectionShorthand = (...args) =>
  every([disallow(['children']), PropTypes.arrayOf(itemShorthand)])(...args)
export const deprecate = (help, validator) => (props, propName, componentName, ...args) => {
  if (typeof help !== 'string') {
    throw new Error(
      [
        'Invalid `help` argument supplied to deprecate, expected a string.',
        `See \`${propName}\` prop in \`${componentName}\`.`,
      ].join(' '),
    )
  }
  if (props[propName] === undefined) return
  const error = new Error(`The \`${propName}\` prop in \`${componentName}\` is deprecated.`)
  if (help) error.message += ` ${help}`
  if (validator) {
    if (typeof validator === 'function') {
      const validationError = validator(props, propName, componentName, ...args)
      if (validationError) {
        error.message = `${error.message} ${validationError.message}`
      }
    } else {
      throw new Error(
        [
          'Invalid argument supplied to deprecate, expected a function.',
          `See \`${propName}\` prop in \`${componentName}\`.`,
        ].join(' '),
      )
    }
  }
  return error
}
export const refObject = PropTypes.shape({
  current: PropTypes.object,
})
export const ref = PropTypes.oneOfType([PropTypes.func, refObject])
````

## File: lib/doesNodeContainClick.js/doesNodeContainClick.js
````javascript
import _ from 'lodash'
const doesNodeContainClick = (node, e) => {
  if (_.some([e, node], _.isNil)) {
    return false
  }
  if (e.target) {
    _.invoke(e.target, 'setAttribute', 'data-suir-click-target', true)
    if (document.querySelector('[data-suir-click-target=true]')) {
      _.invoke(e.target, 'removeAttribute', 'data-suir-click-target')
      if (typeof node.contains === 'function') {
        return node.contains(e.target)
      }
    }
  }
  const { clientX, clientY } = e
  if (_.some([clientX, clientY], _.isNil)) {
    return false
  }
  if (typeof node.getClientRects !== 'function') {
    return false
  }
  const clientRects = node.getClientRects()
  if (!node.offsetWidth || !node.offsetHeight || !clientRects || !clientRects.length) {
    return false
  }
  const { top, bottom, left, right } = _.first(clientRects)
  if (_.some([top, bottom, left, right], _.isNil)) {
    return false
  }
  return _.inRange(clientY, top, bottom + 0.001) && _.inRange(clientX, left, right + 0.001)
}
export default doesNodeContainClick
````

## File: lib/eventStack/index.js/index.js
````javascript
import { instance } from '@semantic-ui-react/event-stack'
export default instance
````

## File: lib/eventStack/README.md/README.md
````markdown
# Event Stack

Moved to: https://github.com/layershifter/event-stack
````

## File: lib/factories.js/factories.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import * as React from 'react'
import * as ReactIs from 'react-is'
const DEPRECATED_CALLS = {}
export function createShorthand(Component, mapValueToProps, val, options = {}) {
  if (!ReactIs.isValidElementType(Component)) {
    throw new Error('createShorthand(): Component should be a valid element type.')
  }
  if (_.isNil(val) || _.isBoolean(val)) {
    return null
  }
  const valIsString = _.isString(val)
  const valIsNumber = _.isNumber(val)
  const valIsFunction = _.isFunction(val)
  const valIsReactElement = React.isValidElement(val)
  const valIsPropsObject = _.isPlainObject(val)
  const valIsPrimitiveValue = valIsString || valIsNumber || _.isArray(val)
  if (!valIsFunction && !valIsReactElement && !valIsPropsObject && !valIsPrimitiveValue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        [
          'Shorthand value must be a string|number|array|object|ReactElement|function.',
          ' Use null|undefined|boolean for none',
          ` Received ${typeof val}.`,
        ].join(''),
      )
    }
    return null
  }
  /* eslint-enable no-console */
  // ----------------------------------------
  // Build up props
  // ----------------------------------------
  const { defaultProps = {} } = options
  // User's props
  const usersProps =
    (valIsReactElement && val.props) ||
    (valIsPropsObject && val) ||
    (valIsPrimitiveValue && mapValueToProps(val))
  let { overrideProps = {} } = options
  overrideProps = _.isFunction(overrideProps)
    ? overrideProps({ ...defaultProps, ...usersProps })
    : overrideProps
  const props = { ...defaultProps, ...usersProps, ...overrideProps }
  if (defaultProps.className || overrideProps.className || usersProps.className) {
    const mergedClassesNames = cx(
      defaultProps.className,
      overrideProps.className,
      usersProps.className,
    )
    props.className = _.uniq(mergedClassesNames.split(' ')).join(' ')
  }
  if (defaultProps.style || overrideProps.style || usersProps.style) {
    props.style = { ...defaultProps.style, ...usersProps.style, ...overrideProps.style }
  }
  if (_.isNil(props.key)) {
    const { childKey } = props
    const { autoGenerateKey = true } = options
    if (!_.isNil(childKey)) {
      props.key = typeof childKey === 'function' ? childKey(props) : childKey
      delete props.childKey
    } else if (autoGenerateKey && (valIsString || valIsNumber)) {
      props.key = val
    }
  }
  if (valIsReactElement) {
    return React.cloneElement(val, props)
  }
  if (typeof props.children === 'function') {
    return props.children(Component, { ...props, children: undefined })
  }
  if (valIsPrimitiveValue || valIsPropsObject) {
    return React.createElement(Component, props)
  }
  if (valIsFunction) {
    if (process.env.NODE_ENV !== 'production') {
      if (!DEPRECATED_CALLS[Component]) {
        DEPRECATED_CALLS[Component] = true
        console.warn(
          `Warning: There is a deprecated shorthand function usage for "${Component}". It is deprecated and will be removed in v3 release. Please follow our upgrade guide: https://github.com/Semantic-Org/Semantic-UI-React/pull/4029`,
        )
      }
    }
    return val(Component, props, props.children)
  }
}
export function createShorthandFactory(Component, mapValueToProps) {
  if (!ReactIs.isValidElementType(Component)) {
    throw new Error('createShorthandFactory(): Component should be a valid element type.')
  }
  return (val, options) => createShorthand(Component, mapValueToProps, val, options)
}
export const createHTMLDivision =  createShorthandFactory('div', (val) => ({
  children: val,
}))
export const createHTMLIframe =  createShorthandFactory('iframe', (src) => ({ src }))
export const createHTMLImage =  createShorthandFactory('img', (val) => ({
  src: val,
}))
export const createHTMLInput =  createShorthandFactory('input', (val) => ({
  type: val,
}))
export const createHTMLLabel =  createShorthandFactory('label', (val) => ({
  children: val,
}))
export const createHTMLParagraph =  createShorthandFactory('p', (val) => ({
  children: val,
}))
````

## File: lib/getComponentType.js/getComponentType.js
````javascript
function getComponentType(props, options = {}) {
  const { defaultAs, getDefault } = options
  if (props.as && props.as !== defaultAs) return props.as
  if (getDefault) {
    const computedDefault = getDefault()
    if (computedDefault) return computedDefault
  }
  if (props.href) return 'a'
  return defaultAs || 'div'
}
export default getComponentType
````

## File: lib/getUnhandledProps.js/getUnhandledProps.js
````javascript
const getUnhandledProps = (Component, props) => {
  const { handledProps = [] } = Component
  return Object.keys(props).reduce((acc, prop) => {
    if (prop === 'childKey' || prop === 'innerRef') return acc
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]
    return acc
  }, {})
}
export default getUnhandledProps
````

## File: lib/hooks/useAutoControlledValue.js/useAutoControlledValue.js
````javascript
import * as React from 'react'
function useAutoControlledValue(options) {
  const initialState =
    typeof options.defaultState === 'undefined' ? options.initialState : options.defaultState
  const [internalState, setInternalState] = React.useState(initialState)
  const state = typeof options.state === 'undefined' ? internalState : options.state
  const stateRef = React.useRef(state)
  React.useEffect(() => {
    stateRef.current = state
  }, [state])
  const setState = React.useCallback((newState) => {
    if (typeof newState === 'function') {
      stateRef.current = newState(stateRef.current)
    } else {
      stateRef.current = newState
    }
    setInternalState(stateRef.current)
  }, [])
  return [state, setState]
}
export default useAutoControlledValue
````

## File: lib/hooks/useClassNamesOnNode.js/useClassNamesOnNode.js
````javascript
import * as React from 'react'
import isRefObject from '../isRefObject'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
const CLASS_NAME_DELITIMITER = /\s+/
export function computeClassNames(classNameRefs) {
  const classNames = []
  if (classNameRefs) {
    classNameRefs.forEach((classNameRef) => {
      if (typeof classNameRef.current === 'string') {
        const classNamesForRef = classNameRef.current.split(CLASS_NAME_DELITIMITER)
        classNamesForRef.forEach((className) => {
          classNames.push(className)
        })
      }
    })
    return classNames.filter(
      (className, i, array) => className.length > 0 && array.indexOf(className) === i,
    )
  }
  return []
}
export function computeClassNamesDifference(prevClassNames, currentClassNames) {
  return [
    currentClassNames.filter((className) => prevClassNames.indexOf(className) === -1),
    prevClassNames.filter((className) => currentClassNames.indexOf(className) === -1),
  ]
}
const prevClassNames = new Map()
export const handleClassNamesChange = (node, classNameRefs) => {
  const currentClassNames = computeClassNames(classNameRefs)
  const [forAdd, forRemoval] = computeClassNamesDifference(
    prevClassNames.get(node) || [],
    currentClassNames,
  )
  if (node) {
    forAdd.forEach((className) => node.classList.add(className))
    forRemoval.forEach((className) => node.classList.remove(className))
  }
  prevClassNames.set(node, currentClassNames)
}
export class NodeRegistry {
  constructor() {
    this.nodes = new Map()
  }
  add = (node, classNameRef) => {
    if (this.nodes.has(node)) {
      const set = this.nodes.get(node)
      set.add(classNameRef)
      return
    }
    const set = new Set()
    set.add(classNameRef)
    this.nodes.set(node, set)
  }
  del = (node, classNameRef) => {
    if (!this.nodes.has(node)) {
      return
    }
    const set = this.nodes.get(node)
    if (set.size === 1) {
      this.nodes.delete(node)
      return
    }
    set.delete(classNameRef)
  }
  emit = (node, callback) => {
    callback(node, this.nodes.get(node))
  }
}
const nodeRegistry = new NodeRegistry()
export default function useClassNamesOnNode(node, className) {
  const classNameRef = React.useRef()
  const isMounted = React.useRef(false)
  useIsomorphicLayoutEffect(() => {
    classNameRef.current = className
    if (isMounted.current) {
      const element = isRefObject(node) ? node.current : node
      nodeRegistry.emit(element, handleClassNamesChange)
    }
    isMounted.current = true
  }, [className])
  useIsomorphicLayoutEffect(() => {
    const element = isRefObject(node) ? node.current : node
    nodeRegistry.add(element, classNameRef)
    nodeRegistry.emit(element, handleClassNamesChange)
    return () => {
      nodeRegistry.del(element, classNameRef)
      nodeRegistry.emit(element, handleClassNamesChange)
    }
  }, [node])
}
````

## File: lib/hooks/useEventCallback.js/useEventCallback.js
````javascript
import * as React from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
export default function useEventCallback(fn) {
  const callbackRef = React.useRef(() => {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('Cannot call an event handler while rendering...')
    }
  })
  useIsomorphicLayoutEffect(() => {
    callbackRef.current = fn
  }, [fn])
  return React.useCallback(
    (...args) => {
      const callback = callbackRef.current
      return callback(...args)
    },
    [callbackRef],
  )
}
````

## File: lib/hooks/useForceUpdate.js/useForceUpdate.js
````javascript
import * as React from 'react'
export default function useForceUpdate() {
  return React.useReducer((x) => x + 1, 0)[1]
}
````

## File: lib/hooks/useIsomorphicLayoutEffect.js/useIsomorphicLayoutEffect.js
````javascript
import * as React from 'react'
import isBrowser from '../isBrowser'
const useIsomorphicLayoutEffect =
  isBrowser() && process.env.NODE_ENV !== 'test' ? React.useLayoutEffect : React.useEffect
export default useIsomorphicLayoutEffect
````

## File: lib/hooks/useMergedRefs.js/useMergedRefs.js
````javascript
import * as React from 'react'
export function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}
export default function useMergedRefs(refA, refB) {
  const mergedCallback = React.useCallback(
    (value) => {
      mergedCallback.current = value
      setRef(refA, value)
      setRef(refB, value)
    },
    [refA, refB],
  )
  return mergedCallback
}
````

## File: lib/hooks/usePrevious.js/usePrevious.js
````javascript
import * as React from 'react'
function usePrevious(value) {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}
export default usePrevious
````

## File: lib/htmlPropsUtils.js/htmlPropsUtils.js
````javascript
import _ from 'lodash'
export const htmlInputAttrs = [
  'selected',
  'defaultValue',
  'defaultChecked',
  'accept',
  'autoCapitalize',
  'autoComplete',
  'autoCorrect',
  'autoFocus',
  'checked',
  'disabled',
  'enterKeyHint',
  'form',
  'id',
  'inputMode',
  'lang',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'step',
  'title',
  'type',
  'value',
]
export const htmlInputEvents = [
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onFocus',
  'onBlur',
  'onChange',
  'onInput',
  'onClick',
  'onContextMenu',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'onSelect',
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
]
export const htmlInputProps = [...htmlInputAttrs, ...htmlInputEvents]
export const htmlImageProps = ['alt', 'height', 'src', 'srcSet', 'width', 'loading']
export const partitionHTMLProps = (props, options = {}) => {
  const { htmlProps = htmlInputProps, includeAria = true } = options
  const inputProps = {}
  const rest = {}
  _.forEach(props, (val, prop) => {
    const possibleAria = includeAria && (/^aria-.*$/.test(prop) || prop === 'role')
    const target = _.includes(htmlProps, prop) || possibleAria ? inputProps : rest
    target[prop] = val
  })
  return [inputProps, rest]
}
````

## File: lib/index.js/index.js
````javascript
import makeDebugger from './makeDebugger'
export ModernAutoControlledComponent from './ModernAutoControlledComponent'
export * as childrenUtils from './childrenUtils'
export {
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getMultipleProp,
  getTextAlignProp,
  getVerticalAlignProp,
  getWidthProp,
} from './classNameBuilders'
export * as customPropTypes from './customPropTypes'
export eventStack from './eventStack'
export * from './factories'
export getComponentType from './getComponentType'
export getUnhandledProps from './getUnhandledProps'
export {
  htmlInputAttrs,
  htmlInputEvents,
  htmlInputProps,
  htmlImageProps,
  partitionHTMLProps,
} from './htmlPropsUtils'
export isBrowser from './isBrowser'
export doesNodeContainClick from './doesNodeContainClick'
export leven from './leven'
export createPaginationItems from './createPaginationItems'
export * as SUI from './SUI'
export { numberToWordMap, numberToWord } from './numberToWord'
export normalizeTransitionDuration from './normalizeTransitionDuration'
export objectDiff from './objectDiff'
export isRefObject from './isRefObject'
export { makeDebugger }
export useAutoControlledValue from './hooks/useAutoControlledValue'
export useClassNamesOnNode from './hooks/useClassNamesOnNode'
export useEventCallback from './hooks/useEventCallback'
export useForceUpdate from './hooks/useForceUpdate'
export useIsomorphicLayoutEffect from './hooks/useIsomorphicLayoutEffect'
export useMergedRefs, { setRef } from './hooks/useMergedRefs'
export usePrevious from './hooks/usePrevious'
````

## File: lib/isBrowser.js/isBrowser.js
````javascript
import _ from 'lodash'
const hasDocument = typeof document === 'object' && document !== null
const hasWindow = typeof window === 'object' && window !== null && window.self === window
const isBrowser = () =>
  !_.isNil(isBrowser.override) ? isBrowser.override : hasDocument && hasWindow
export default isBrowser
````

## File: lib/isRefObject.js/isRefObject.js
````javascript
export default function isRefObject(ref) {
  return ref !== null && typeof ref === 'object' && ref.hasOwnProperty('current')
}
````

## File: lib/leven.js/leven.js
````javascript
let leven = () => 0
if (process.env.NODE_ENV !== 'production') {
  const arr = []
  const charCodeCache = []
  leven = (a, b) => {
    if (a === b) return 0
    const aLen = a.length
    const bLen = b.length
    if (aLen === 0) return bLen
    if (bLen === 0) return aLen
    let bCharCode
    let ret
    let tmp
    let tmp2
    let i = 0
    let j = 0
    while (i < aLen) {
      charCodeCache[i] = a.charCodeAt(i)
      arr[i] = ++i
    }
    while (j < bLen) {
      bCharCode = b.charCodeAt(j)
      tmp = j++
      ret = j
      for (i = 0; i < aLen; i++) {
        tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1
        tmp = arr[i]
        ret = arr[i] = tmp > ret ? (tmp2 > ret ? ret + 1 : tmp2) : tmp2 > tmp ? tmp + 1 : tmp2
      }
    }
    return ret
  }
}
export default leven
````

## File: lib/makeDebugger.js/makeDebugger.js
````javascript
import debug from 'debug'
import isBrowser from './isBrowser'
if (isBrowser() && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  let DEBUG
  try {
    DEBUG = window.localStorage.debug
  } catch (e) {
    console.error('Semantic-UI-React could not enable debug.')
    console.error(e)
  }
  debug.enable(DEBUG)
}
const makeDebugger = (namespace) => debug(`semanticUIReact:${namespace}`)
export default makeDebugger
````

## File: lib/ModernAutoControlledComponent.js/ModernAutoControlledComponent.js
````javascript
import _ from 'lodash'
import * as React from 'react'
const getDefaultPropName = (prop) => `default${prop[0].toUpperCase() + prop.slice(1)}`
const getAutoControlledStateValue = (propName, props, state, includeDefaults = false) => {
  const propValue = props[propName]
  if (propValue !== undefined) return propValue
  if (includeDefaults) {
    const defaultProp = props[getDefaultPropName(propName)]
    if (defaultProp !== undefined) return defaultProp
    if (state) {
      const initialState = state[propName]
      if (initialState !== undefined) return initialState
    }
  }
  if (propName === 'checked') return false
  if (propName === 'value') return props.multiple ? [] : ''
  // otherwise, undefined
}
export default class ModernAutoControlledComponent extends React.Component {
  constructor(...args) {
    super(...args)
    const { autoControlledProps, getAutoControlledStateFromProps } = this.constructor
    const state = _.invoke(this, 'getInitialAutoControlledState', this.props) || {}
    if (process.env.NODE_ENV !== 'production') {
      const { defaultProps, name, propTypes, getDerivedStateFromProps } = this.constructor
      if (getDerivedStateFromProps !== ModernAutoControlledComponent.getDerivedStateFromProps) {
        console.error(
          `Auto controlled ${name} must specify a static getAutoControlledStateFromProps() instead of getDerivedStateFromProps().`,
        )
      }
      _.each(autoControlledProps, (prop) => {
        const defaultProp = getDefaultPropName(prop)
        if (!_.has(propTypes, defaultProp)) {
          console.error(
            `${name} is missing "${defaultProp}" propTypes validation for auto controlled prop "${prop}".`,
          )
        }
        if (!_.has(propTypes, prop)) {
          console.error(
            `${name} is missing propTypes validation for auto controlled prop "${prop}".`,
          )
        }
      })
      const illegalDefaults = _.intersection(autoControlledProps, _.keys(defaultProps))
      if (!_.isEmpty(illegalDefaults)) {
        console.error(
          [
            'Do not set defaultProps for autoControlledProps. You can set defaults by',
            'setting state in the constructor or using an ES7 property initializer',
            '(https://babeljs.io/blog/2015/06/07/react-on-es6-plus#property-initializers)',
            `See ${name} props: "${illegalDefaults}".`,
          ].join(' '),
        )
      }
      const illegalAutoControlled = _.filter(autoControlledProps, (prop) =>
        _.startsWith(prop, 'default'),
      )
      if (!_.isEmpty(illegalAutoControlled)) {
        console.error(
          [
            'Do not add default props to autoControlledProps.',
            'Default props are automatically handled.',
            `See ${name} autoControlledProps: "${illegalAutoControlled}".`,
          ].join(' '),
        )
      }
    }
    const initialAutoControlledState = autoControlledProps.reduce((acc, prop) => {
      acc[prop] = getAutoControlledStateValue(prop, this.props, state, true)
      if (process.env.NODE_ENV !== 'production') {
        const defaultPropName = getDefaultPropName(prop)
        const { name } = this.constructor
        if (!_.isUndefined(this.props[defaultPropName]) && !_.isUndefined(this.props[prop])) {
          console.error(
            `${name} prop "${prop}" is auto controlled. Specify either ${defaultPropName} or ${prop}, but not both.`,
          )
        }
      }
      return acc
    }, {})
    this.state = {
      ...state,
      ...initialAutoControlledState,
      autoControlledProps,
      getAutoControlledStateFromProps,
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { autoControlledProps, getAutoControlledStateFromProps } = state
    const newStateFromProps = autoControlledProps.reduce((acc, prop) => {
      const isNextDefined = !_.isUndefined(props[prop])
      if (isNextDefined) acc[prop] = props[prop]
      return acc
    }, {})
    if (getAutoControlledStateFromProps) {
      const computedState = getAutoControlledStateFromProps(
        props,
        {
          ...state,
          ...newStateFromProps,
        },
        state,
      )
      return { ...newStateFromProps, ...computedState }
    }
    return newStateFromProps
  }
  static getAutoControlledStateFromProps() {
    return null
  }
}
````

## File: lib/normalizeTransitionDuration.js/normalizeTransitionDuration.js
````javascript
export default (duration, type) =>
  typeof duration === 'number' || typeof duration === 'string' ? duration : duration[type]
````

## File: lib/numberToWord.js/numberToWord.js
````javascript
export const numberToWordMap = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
}
export function numberToWord(value) {
  const type = typeof value
  if (type === 'string' || type === 'number') {
    return numberToWordMap[value] || value
  }
  return ''
}
````

## File: lib/objectDiff.js/objectDiff.js
````javascript
import _ from 'lodash'
export default (source, target) =>
  _.transform(
    source,
    (res, val, key) => {
      if (!_.has(target, key)) res[key] = '[DELETED]'
      else if (!_.isEqual(val, target[key])) res[key] = target[key]
    },
    {},
  )
````

## File: lib/SUI.js/SUI.js
````javascript
import _ from 'lodash'
import { numberToWordMap } from './numberToWord'
export const COLORS = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
  'black',
]
export const FLOATS = ['left', 'right']
export const SIZES = ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']
export const TEXT_ALIGNMENTS = ['left', 'center', 'right', 'justified']
export const VERTICAL_ALIGNMENTS = ['bottom', 'middle', 'top']
export const VISIBILITY = ['mobile', 'tablet', 'computer', 'large screen', 'widescreen']
export const WIDTHS = [
  ..._.keys(numberToWordMap),
  ..._.keys(numberToWordMap).map(Number),
  ..._.values(numberToWordMap),
]
export const DIRECTIONAL_TRANSITIONS = [
  'browse',
  'browse right',
  'drop',
  'fade',
  'fade up',
  'fade down',
  'fade left',
  'fade right',
  'fly up',
  'fly down',
  'fly left',
  'fly right',
  'horizontal flip',
  'vertical flip',
  'scale',
  'slide up',
  'slide down',
  'slide left',
  'slide right',
  'swing up',
  'swing down',
  'swing left',
  'swing right',
  'zoom',
]
export const STATIC_TRANSITIONS = ['jiggle', 'flash', 'shake', 'pulse', 'tada', 'bounce', 'glow']
export const TRANSITIONS = [...DIRECTIONAL_TRANSITIONS, ...STATIC_TRANSITIONS]
export const ACCESSIBILITY = [
  'american sign language interpreting',
  'assistive listening systems',
  'audio description',
  'blind',
  'braille',
  'closed captioning',
  'closed captioning outline',
  'deaf',
  'low vision',
  'phone volume',
  'question circle',
  'question circle outline',
  'sign language',
  'tty',
  'universal access',
  'wheelchair',
]
export const ARROWS = [
  'angle double down',
  'angle double left',
  'angle double right',
  'angle double up',
  'angle down',
  'angle left',
  'angle right',
  'angle up',
  'arrow alternate circle down',
  'arrow alternate circle down outline',
  'arrow alternate circle left',
  'arrow alternate circle left outline',
  'arrow alternate circle right',
  'arrow alternate circle right outline',
  'arrow alternate circle up',
  'arrow alternate circle up outline',
  'arrow circle down',
  'arrow circle left',
  'arrow circle right',
  'arrow circle up',
  'arrow down',
  'arrow left',
  'arrow right',
  'arrow up',
  'arrows alternate',
  'arrows alternate horizontal',
  'arrows alternate vertical',
  'caret down',
  'caret left',
  'caret right',
  'caret square down',
  'caret square down outline',
  'caret square left',
  'caret square left outline',
  'caret square right',
  'caret square right outline',
  'caret square up',
  'caret square up outline',
  'caret up',
  'cart arrow down',
  'chart line',
  'chevron circle down',
  'chevron circle left',
  'chevron circle right',
  'chevron circle up',
  'chevron down',
  'chevron left',
  'chevron right',
  'chevron up',
  'cloud download',
  'cloud upload',
  'download',
  'exchange',
  'expand arrows alternate',
  'external alternate',
  'external square alternate',
  'hand point down',
  'hand point down outline',
  'hand point left',
  'hand point left outline',
  'hand point right',
  'hand point right outline',
  'hand point up',
  'hand point up outline',
  'hand pointer',
  'hand pointer outline',
  'history',
  'level down alternate',
  'level up alternate',
  'location arrow',
  'long arrow alternate down',
  'long arrow alternate left',
  'long arrow alternate right',
  'long arrow alternate up',
  'mouse pointer',
  'play',
  'random',
  'recycle',
  'redo',
  'redo alternate',
  'reply',
  'reply all',
  'retweet',
  'share',
  'share square',
  'share square outline',
  'sign-in',
  'sign-out',
  'sign-in alternate',
  'sign-out alternate',
  'sort',
  'sort alphabet down',
  'sort alphabet up',
  'sort amount down',
  'sort amount up',
  'sort down',
  'sort numeric down',
  'sort numeric up',
  'sort up',
  'sync',
  'sync alternate',
  'text height',
  'text width',
  'undo',
  'undo alternate',
  'upload',
  'zoom-in',
  'zoom-out',
]
export const AUDIO_VIDEO = [
  'audio description',
  'backward',
  'circle',
  'circle outline',
  'closed captioning',
  'closed captioning outline',
  'compress',
  'eject',
  'expand',
  'expand arrows alternate',
  'fast backward',
  'fast forward',
  'file audio',
  'file audio outline',
  'file video',
  'file video outline',
  'film',
  'forward',
  'headphones',
  'microphone',
  'microphone slash',
  'music',
  'pause',
  'pause circle',
  'pause circle outline',
  'phone volume',
  'play',
  'play circle',
  'play circle outline',
  'podcast',
  'random',
  'redo',
  'redo alternate',
  'rss',
  'rss square',
  'step backward',
  'step forward',
  'stop',
  'stop circle',
  'stop circle outline',
  'sync',
  'sync alternate',
  'undo',
  'undo alternate',
  'video',
  'volume down',
  'volume off',
  'volume up',
]
export const BUSINESS = [
  'address book',
  'address book outline',
  'address card',
  'address card outline',
  'archive',
  'balance scale',
  'birthday cake',
  'book',
  'briefcase',
  'building',
  'building outline',
  'bullhorn',
  'bullseye',
  'calculator',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'certificate',
  'chart area',
  'chart bar',
  'chart bar outline',
  'chart line',
  'chart pie',
  'clipboard',
  'clipboard outline',
  'coffee',
  'columns',
  'compass',
  'compass outline',
  'copy',
  'copy outline',
  'copyright',
  'copyright outline',
  'cut',
  'edit',
  'edit outline',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'envelope square',
  'eraser',
  'fax',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'globe',
  'industry',
  'paperclip',
  'paste',
  'pen square',
  'pencil alternate',
  'percent',
  'phone',
  'phone square',
  'phone volume',
  'registered',
  'registered outline',
  'save',
  'save outline',
  'sitemap',
  'sticky note',
  'sticky note outline',
  'suitcase',
  'table',
  'tag',
  'tags',
  'tasks',
  'thumbtack',
  'trademark',
]
export const CHESS = [
  'chess',
  'chess bishop',
  'chess board',
  'chess king',
  'chess knight',
  'chess pawn',
  'chess queen',
  'chess rook',
  'square full',
]
export const CODE = [
  'archive',
  'barcode',
  'bath',
  'bug',
  'code',
  'code branch',
  'coffee',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'file code',
  'file code outline',
  'filter',
  'fire extinguisher',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'keyboard',
  'keyboard outline',
  'microchip',
  'qrcode',
  'shield alternate',
  'sitemap',
  'terminal',
  'user secret',
  'window close',
  'window close outline',
  'window maximize',
  'window maximize outline',
  'window minimize',
  'window minimize outline',
  'window restore',
  'window restore outline',
]
export const COMMUNICATION = [
  'address book',
  'address book outline',
  'address card',
  'address card outline',
  'american sign language interpreting',
  'assistive listening systems',
  'at',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'bullhorn',
  'comment',
  'comment outline',
  'comment alternate',
  'comment alternate outline',
  'comments',
  'comments outline',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'envelope square',
  'fax',
  'inbox',
  'language',
  'microphone',
  'microphone slash',
  'mobile',
  'mobile alternate',
  'paper plane',
  'paper plane outline',
  'phone',
  'phone square',
  'phone volume',
  'rss',
  'rss square',
  'tty',
  'wifi',
]
export const COMPUTERS = [
  'desktop',
  'download',
  'hdd',
  'hdd outline',
  'headphones',
  'keyboard',
  'keyboard outline',
  'laptop',
  'microchip',
  'mobile',
  'mobile alternate',
  'plug',
  'power off',
  'print',
  'save',
  'save outline',
  'server',
  'tablet',
  'tablet alternate',
  'tv',
  'upload',
]
export const CURRENCY = [
  'dollar sign',
  'euro sign',
  'lira sign',
  'money bill alternate',
  'money bill alternate outline',
  'pound sign',
  'ruble sign',
  'rupee sign',
  'shekel sign',
  'won sign',
  'yen sign',
]
export const DATE_TIME = [
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'calendar check',
  'calendar check outline',
  'calendar minus',
  'calendar minus outline',
  'calendar plus',
  'calendar plus outline',
  'calendar times',
  'calendar times outline',
  'clock',
  'clock outline',
  'hourglass',
  'hourglass outline',
  'hourglass end',
  'hourglass half',
  'hourglass start',
  'stopwatch',
]
export const DESIGN = [
  'adjust',
  'clone',
  'clone outline',
  'copy',
  'copy outline',
  'crop',
  'crosshairs',
  'cut',
  'edit',
  'edit outline',
  'eraser',
  'eye',
  'eye dropper',
  'eye slash',
  'eye slash outline',
  'object group',
  'object group outline',
  'object ungroup',
  'object ungroup outline',
  'paint brush',
  'paste',
  'pencil alternate',
  'save',
  'save outline',
  'tint',
]
export const EDITORS = [
  'align center',
  'align justify',
  'align left',
  'align right',
  'bold',
  'clipboard',
  'clipboard outline',
  'clone',
  'clone outline',
  'columns',
  'copy',
  'copy outline',
  'cut',
  'edit',
  'edit outline',
  'eraser',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'font',
  'heading',
  'i cursor',
  'indent',
  'italic',
  'linkify',
  'list',
  'list alternate',
  'list alternate outline',
  'list ol',
  'list ul',
  'outdent',
  'paper plane',
  'paper plane outline',
  'paperclip',
  'paragraph',
  'paste',
  'pencil alternate',
  'print',
  'quote left',
  'quote right',
  'redo',
  'redo alternate',
  'reply',
  'reply all',
  'share',
  'strikethrough',
  'subscript',
  'superscript',
  'sync',
  'sync alternate',
  'table',
  'tasks',
  'text height',
  'text width',
  'th',
  'th large',
  'th list',
  'trash',
  'trash alternate',
  'trash alternate outline',
  'underline',
  'undo',
  'undo alternate',
  'unlink',
]
export const FILES = [
  'archive',
  'clone',
  'clone outline',
  'copy',
  'copy outline',
  'cut',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'file archive',
  'file archive outline',
  'file audio',
  'file audio outline',
  'file code',
  'file code outline',
  'file excel',
  'file excel outline',
  'file image',
  'file image outline',
  'file pdf',
  'file pdf outline',
  'file powerpoint',
  'file powerpoint outline',
  'file video',
  'file video outline',
  'file word',
  'file word outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'paste',
  'save',
  'save outline',
  'sticky note',
  'sticky note outline',
]
export const GENDERS = [
  'genderless',
  'mars',
  'mars double',
  'mars stroke',
  'mars stroke horizontal',
  'mars stroke vertical',
  'mercury',
  'neuter',
  'transgender',
  'transgender alternate',
  'venus',
  'venus double',
  'venus mars',
]
export const HANDS_GESTURES = [
  'hand lizard',
  'hand lizard outline',
  'hand paper',
  'hand paper outline',
  'hand peace',
  'hand peace outline',
  'hand point down',
  'hand point down outline',
  'hand point left',
  'hand point left outline',
  'hand point right',
  'hand point right outline',
  'hand point up',
  'hand point up outline',
  'hand pointer',
  'hand pointer outline',
  'hand rock',
  'hand rock outline',
  'hand scissors',
  'hand scissors outline',
  'hand spock',
  'hand spock outline',
  'handshake',
  'handshake outline',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
]
export const HEALTH = [
  'ambulance',
  'h square',
  'heart',
  'heart outline',
  'heartbeat',
  'hospital',
  'hospital outline',
  'medkit',
  'plus square',
  'plus square outline',
  'stethoscope',
  'user md',
  'wheelchair',
]
export const IMAGES = [
  'adjust',
  'bolt',
  'camera',
  'camera retro',
  'clone',
  'clone outline',
  'compress',
  'expand',
  'eye',
  'eye dropper',
  'eye slash',
  'eye slash outline',
  'file image',
  'file image outline',
  'film',
  'id badge',
  'id badge outline',
  'id card',
  'id card outline',
  'image',
  'image outline',
  'images',
  'images outline',
  'sliders horizontal',
  'tint',
]
export const INTERFACES = [
  'ban',
  'barcode',
  'bars',
  'beer',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'bug',
  'bullhorn',
  'bullseye',
  'calculator',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'calendar check',
  'calendar check outline',
  'calendar minus',
  'calendar minus outline',
  'calendar plus',
  'calendar plus outline',
  'calendar times',
  'calendar times outline',
  'certificate',
  'check',
  'check circle',
  'check circle outline',
  'check square',
  'check square outline',
  'circle',
  'circle outline',
  'clipboard',
  'clipboard outline',
  'clone',
  'clone outline',
  'cloud',
  'cloud download',
  'cloud upload',
  'coffee',
  'cog',
  'cogs',
  'copy',
  'copy outline',
  'cut',
  'database',
  'dot circle',
  'dot circle outline',
  'download',
  'edit',
  'edit outline',
  'ellipsis horizontal',
  'ellipsis vertical',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'eraser',
  'exclamation',
  'exclamation circle',
  'exclamation triangle',
  'external alternate',
  'external square alternate',
  'eye',
  'eye slash',
  'eye slash outline',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'filter',
  'flag',
  'flag outline',
  'flag checkered',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'frown',
  'frown outline',
  'hashtag',
  'heart',
  'heart outline',
  'history',
  'home',
  'i cursor',
  'info',
  'info circle',
  'language',
  'magic',
  'meh',
  'meh outline',
  'microphone',
  'microphone slash',
  'minus',
  'minus circle',
  'minus square',
  'minus square outline',
  'paste',
  'pencil alternate',
  'plus',
  'plus circle',
  'plus square',
  'plus square outline',
  'qrcode',
  'question',
  'question circle',
  'question circle outline',
  'quote left',
  'quote right',
  'redo',
  'redo alternate',
  'reply',
  'reply all',
  'rss',
  'rss square',
  'save',
  'save outline',
  'search',
  'search minus',
  'search plus',
  'share',
  'share alternate',
  'share alternate square',
  'share square',
  'share square outline',
  'shield alternate',
  'sign-in',
  'sign-out',
  'signal',
  'sitemap',
  'sliders horizontal',
  'smile',
  'smile outline',
  'sort',
  'sort alphabet down',
  'sort alphabet up',
  'sort amount down',
  'sort amount up',
  'sort down',
  'sort numeric down',
  'sort numeric up',
  'sort up',
  'star',
  'star outline',
  'star half',
  'star half outline',
  'sync',
  'sync alternate',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
  'times',
  'times circle',
  'times circle outline',
  'toggle off',
  'toggle on',
  'trash',
  'trash alternate',
  'trash alternate outline',
  'trophy',
  'undo',
  'undo alternate',
  'upload',
  'user',
  'user outline',
  'user circle',
  'user circle outline',
  'wifi',
]
export const LOGISTICS = [
  'box',
  'boxes',
  'clipboard check',
  'clipboard list',
  'dolly',
  'dolly flatbed',
  'pallet',
  'shipping fast',
  'truck',
  'warehouse',
]
export const MAPS = [
  'ambulance',
  'anchor',
  'balance scale',
  'bath',
  'bed',
  'beer',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'bicycle',
  'binoculars',
  'birthday cake',
  'blind',
  'bomb',
  'book',
  'bookmark',
  'bookmark outline',
  'briefcase',
  'building',
  'building outline',
  'car',
  'coffee',
  'crosshairs',
  'dollar sign',
  'eye',
  'eye slash',
  'eye slash outline',
  'fighter jet',
  'fire',
  'fire extinguisher',
  'flag',
  'flag outline',
  'flag checkered',
  'flask',
  'gamepad',
  'gavel',
  'gift',
  'glass martini',
  'globe',
  'graduation cap',
  'h square',
  'heart',
  'heart outline',
  'heartbeat',
  'home',
  'hospital',
  'hospital outline',
  'image',
  'image outline',
  'images',
  'images outline',
  'industry',
  'info',
  'info circle',
  'key',
  'leaf',
  'lemon',
  'lemon outline',
  'life ring',
  'life ring outline',
  'lightbulb',
  'lightbulb outline',
  'location arrow',
  'low vision',
  'magnet',
  'male',
  'map',
  'map outline',
  'map marker',
  'map marker alternate',
  'map pin',
  'map signs',
  'medkit',
  'money bill alternate',
  'money bill alternate outline',
  'motorcycle',
  'music',
  'newspaper',
  'newspaper outline',
  'paw',
  'phone',
  'phone square',
  'phone volume',
  'plane',
  'plug',
  'plus',
  'plus square',
  'plus square outline',
  'print',
  'recycle',
  'road',
  'rocket',
  'search',
  'search minus',
  'search plus',
  'ship',
  'shopping bag',
  'shopping basket',
  'shopping cart',
  'shower',
  'street view',
  'subway',
  'suitcase',
  'tag',
  'tags',
  'taxi',
  'thumbtack',
  'ticket alternate',
  'tint',
  'train',
  'tree',
  'trophy',
  'truck',
  'tty',
  'umbrella',
  'university',
  'utensil spoon',
  'utensils',
  'wheelchair',
  'wifi',
  'wrench',
]
export const MEDICAL = [
  'ambulance',
  'band aid',
  'dna',
  'first aid',
  'heart',
  'heart outline',
  'heartbeat',
  'hospital',
  'hospital outline',
  'hospital symbol',
  'pills',
  'plus',
  'stethoscope',
  'syringe',
  'thermometer',
  'user md',
  'weight',
]
export const OBJECTS = [
  'ambulance',
  'anchor',
  'archive',
  'balance scale',
  'bath',
  'bed',
  'beer',
  'bell',
  'bell outline',
  'bicycle',
  'binoculars',
  'birthday cake',
  'bomb',
  'book',
  'bookmark',
  'bookmark outline',
  'briefcase',
  'bug',
  'building',
  'building outline',
  'bullhorn',
  'bullseye',
  'bus',
  'calculator',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'camera',
  'camera retro',
  'car',
  'clipboard',
  'clipboard outline',
  'cloud',
  'coffee',
  'cog',
  'cogs',
  'compass',
  'compass outline',
  'copy',
  'copy outline',
  'cube',
  'cubes',
  'cut',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'eraser',
  'eye',
  'eye dropper',
  'fax',
  'fighter jet',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'film',
  'fire',
  'fire extinguisher',
  'flag',
  'flag outline',
  'flag checkered',
  'flask',
  'futbol',
  'futbol outline',
  'gamepad',
  'gavel',
  'gem',
  'gem outline',
  'gift',
  'glass martini',
  'globe',
  'graduation cap',
  'hdd',
  'hdd outline',
  'headphones',
  'heart',
  'heart outline',
  'home',
  'hospital',
  'hospital outline',
  'hourglass',
  'hourglass outline',
  'image',
  'image outline',
  'images',
  'images outline',
  'industry',
  'key',
  'keyboard',
  'keyboard outline',
  'laptop',
  'leaf',
  'lemon',
  'lemon outline',
  'life ring',
  'life ring outline',
  'lightbulb',
  'lightbulb outline',
  'lock',
  'lock open',
  'magic',
  'magnet',
  'map',
  'map outline',
  'map marker',
  'map marker alternate',
  'map pin',
  'map signs',
  'medkit',
  'microchip',
  'microphone',
  'mobile',
  'mobile alternate',
  'money bill alternate',
  'money bill alternate outline',
  'moon',
  'moon outline',
  'motorcycle',
  'newspaper',
  'newspaper outline',
  'paint brush',
  'paper plane',
  'paper plane outline',
  'paperclip',
  'paste',
  'paw',
  'pencil alternate',
  'phone',
  'plane',
  'plug',
  'print',
  'puzzle piece',
  'road',
  'rocket',
  'save',
  'save outline',
  'search',
  'shield alternate',
  'shopping bag',
  'shopping basket',
  'shopping cart',
  'shower',
  'snowflake',
  'snowflake outline',
  'space shuttle',
  'star',
  'star outline',
  'sticky note',
  'sticky note outline',
  'stopwatch',
  'subway',
  'suitcase',
  'sun',
  'sun outline',
  'tablet',
  'tablet alternate',
  'tachometer alternate',
  'tag',
  'tags',
  'taxi',
  'thumbtack',
  'ticket alternate',
  'train',
  'trash',
  'trash alternate',
  'trash alternate outline',
  'tree',
  'trophy',
  'truck',
  'tv',
  'umbrella',
  'university',
  'unlock',
  'unlock alternate',
  'utensil spoon',
  'utensils',
  'wheelchair',
  'wrench',
]
export const PAYMENTS_SHOPPING = [
  'bell',
  'bell outline',
  'bookmark',
  'bookmark outline',
  'bullhorn',
  'camera',
  'camera retro',
  'cart arrow down',
  'cart plus',
  'certificate',
  'credit card',
  'credit card outline',
  'gem',
  'gem outline',
  'gift',
  'handshake',
  'handshake outline',
  'heart',
  'heart outline',
  'key',
  'shopping bag',
  'shopping basket',
  'shopping cart',
  'star',
  'star outline',
  'tag',
  'tags',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
  'trophy',
]
export const SHAPES = [
  'bookmark',
  'bookmark outline',
  'calendar',
  'calendar outline',
  'certificate',
  'circle',
  'circle outline',
  'cloud',
  'comment',
  'comment outline',
  'file',
  'file outline',
  'folder',
  'folder outline',
  'heart',
  'heart outline',
  'map marker',
  'play',
  'square',
  'square outline',
  'star',
  'star outline',
]
export const SPINNERS = [
  'asterisk',
  'certificate',
  'circle notch',
  'cog',
  'compass',
  'compass outline',
  'crosshairs',
  'life ring',
  'life ring outline',
  'snowflake',
  'snowflake outline',
  'spinner',
  'sun',
  'sun outline',
  'sync',
]
export const SPORTS = [
  'baseball ball',
  'basketball ball',
  'bowling ball',
  'football ball',
  'futbol',
  'futbol outline',
  'golf ball',
  'hockey puck',
  'quidditch',
  'table tennis',
  'volleyball ball',
]
export const STATUS = [
  'ban',
  'battery empty',
  'battery full',
  'battery half',
  'battery quarter',
  'battery three quarters',
  'bell',
  'bell outline',
  'bell slash',
  'bell slash outline',
  'calendar',
  'calendar outline',
  'calendar alternate',
  'calendar alternate outline',
  'calendar check',
  'calendar check outline',
  'calendar minus',
  'calendar minus outline',
  'calendar plus',
  'calendar plus outline',
  'calendar times',
  'calendar times outline',
  'cart arrow down',
  'cart plus',
  'exclamation',
  'exclamation circle',
  'exclamation triangle',
  'eye',
  'eye slash',
  'eye slash outline',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'info',
  'info circle',
  'lock',
  'lock open',
  'minus',
  'minus circle',
  'minus square',
  'minus square outline',
  'plus',
  'plus circle',
  'plus square',
  'plus square outline',
  'question',
  'question circle',
  'question circle outline',
  'shield alternate',
  'shopping cart',
  'sign in alternate',
  'sign out alternate',
  'thermometer empty',
  'thermometer full',
  'thermometer half',
  'thermometer quarter',
  'thermometer three quarters',
  'thumbs down',
  'thumbs down outline',
  'thumbs up',
  'thumbs up outline',
  'toggle off',
  'toggle on',
  'unlock',
  'unlock alternate',
]
export const USERS_PEOPLE = [
  'address book',
  'address book outline',
  'address card',
  'address card outline',
  'bed',
  'blind',
  'child',
  'female',
  'frown',
  'frown outline',
  'id badge',
  'id badge outline',
  'id card',
  'id card outline',
  'male',
  'meh',
  'meh outline',
  'power off',
  'smile',
  'smile outline',
  'street view',
  'user',
  'user outline',
  'user circle',
  'user circle outline',
  'user md',
  'user plus',
  'user secret',
  'user times',
  'users',
  'wheelchair',
]
export const VEHICLES = [
  'ambulance',
  'bicycle',
  'bus',
  'car',
  'fighter jet',
  'motorcycle',
  'paper plane',
  'paper plane outline',
  'plane',
  'rocket',
  'ship',
  'shopping cart',
  'space shuttle',
  'subway',
  'taxi',
  'train',
  'truck',
  'wheelchair',
]
export const WRITING = [
  'archive',
  'book',
  'bookmark',
  'bookmark outline',
  'edit',
  'edit outline',
  'envelope',
  'envelope outline',
  'envelope open',
  'envelope open outline',
  'eraser',
  'file',
  'file outline',
  'file alternate',
  'file alternate outline',
  'folder',
  'folder outline',
  'folder open',
  'folder open outline',
  'keyboard',
  'keyboard outline',
  'newspaper',
  'newspaper outline',
  'paper plane',
  'paper plane outline',
  'paperclip',
  'paragraph',
  'pen square',
  'pencil alternate',
  'quote left',
  'quote right',
  'sticky note',
  'sticky note outline',
  'thumbtack',
]
export const BRANDS = [
  '500px',
  'accessible',
  'accusoft',
  'adn',
  'adversal',
  'affiliatetheme',
  'algolia',
  'amazon',
  'amazon pay',
  'amilia',
  'android',
  'angellist',
  'angrycreative',
  'angular',
  'app store',
  'app store ios',
  'apper',
  'apple',
  'apple pay',
  'asymmetrik',
  'audible',
  'autoprefixer',
  'avianex',
  'aviato',
  'aws',
  'bandcamp',
  'behance',
  'behance square',
  'bimobject',
  'bitbucket',
  'bitcoin',
  'bity',
  'black tie',
  'blackberry',
  'blogger',
  'blogger b',
  'bluetooth',
  'bluetooth b',
  'btc',
  'buromobelexperte',
  'buysellads',
  'cc amazon pay',
  'cc amex',
  'cc apple pay',
  'cc diners club',
  'cc discover',
  'cc jcb',
  'cc mastercard',
  'cc paypal',
  'cc stripe',
  'cc visa',
  'centercode',
  'chrome',
  'cloudscale',
  'cloudsmith',
  'cloudversify',
  'codepen',
  'codiepie',
  'connectdevelop',
  'contao',
  'cpanel',
  'creative commons',
  'css3',
  'css3 alternate',
  'cuttlefish',
  'd and d',
  'dashcube',
  'delicious',
  'deploydog',
  'deskpro',
  'deviantart',
  'digg',
  'digital ocean',
  'discord',
  'discourse',
  'dochub',
  'docker',
  'draft2digital',
  'dribbble',
  'dribbble square',
  'dropbox',
  'drupal',
  'dyalog',
  'earlybirds',
  'edge',
  'elementor',
  'ember',
  'empire',
  'envira',
  'erlang',
  'ethereum',
  'etsy',
  'expeditedssl',
  'facebook',
  'facebook f',
  'facebook messenger',
  'facebook square',
  'firefox',
  'first order',
  'firstdraft',
  'flickr',
  'flipboard',
  'fly',
  'font awesome',
  'font awesome alternate',
  'font awesome flag',
  'fonticons',
  'fonticons fi',
  'fort awesome',
  'fort awesome alternate',
  'forumbee',
  'foursquare',
  'free code camp',
  'freebsd',
  'get pocket',
  'gg',
  'gg circle',
  'git',
  'git square',
  'github',
  'github alternate',
  'github square',
  'gitkraken',
  'gitlab',
  'gitter',
  'glide',
  'glide g',
  'gofore',
  'goodreads',
  'goodreads g',
  'google',
  'google drive',
  'google play',
  'google plus',
  'google plus g',
  'google plus square',
  'google wallet',
  'gratipay',
  'grav',
  'gripfire',
  'grunt',
  'gulp',
  'hacker news',
  'hacker news square',
  'hips',
  'hire a helper',
  'hooli',
  'hotjar',
  'houzz',
  'html5',
  'hubspot',
  'imdb',
  'instagram',
  'internet explorer',
  'ioxhost',
  'itunes',
  'itunes note',
  'jenkins',
  'joget',
  'joomla',
  'js',
  'js square',
  'jsfiddle',
  'keycdn',
  'kickstarter',
  'kickstarter k',
  'korvue',
  'laravel',
  'lastfm',
  'lastfm square',
  'leanpub',
  'less',
  'linechat',
  'linkedin',
  'linkedin alternate',
  'linode',
  'linux',
  'lyft',
  'magento',
  'maxcdn',
  'medapps',
  'medium',
  'medium m',
  'medrt',
  'meetup',
  'microsoft',
  'mix',
  'mixcloud',
  'mizuni',
  'modx',
  'monero',
  'napster',
  'nintendo switch',
  'node',
  'node js',
  'npm',
  'ns8',
  'nutritionix',
  'odnoklassniki',
  'odnoklassniki square',
  'opencart',
  'openid',
  'opera',
  'optin monster',
  'osi',
  'page4',
  'pagelines',
  'palfed',
  'patreon',
  'paypal',
  'periscope',
  'phabricator',
  'phoenix framework',
  'php',
  'pied piper',
  'pied piper alternate',
  'pied piper pp',
  'pinterest',
  'pinterest p',
  'pinterest square',
  'playstation',
  'product hunt',
  'pushed',
  'python',
  'qq',
  'quinscape',
  'quora',
  'ravelry',
  'react',
  'rebel',
  'redriver',
  'reddit',
  'reddit alien',
  'reddit square',
  'rendact',
  'renren',
  'replyd',
  'resolving',
  'rocketchat',
  'rockrms',
  'safari',
  'sass',
  'schlix',
  'scribd',
  'searchengin',
  'sellcast',
  'sellsy',
  'servicestack',
  'shirtsinbulk',
  'simplybuilt',
  'sistrix',
  'skyatlas',
  'skype',
  'slack',
  'slack hash',
  'slideshare',
  'snapchat',
  'snapchat ghost',
  'snapchat square',
  'soundcloud',
  'speakap',
  'spotify',
  'stack exchange',
  'stack overflow',
  'staylinked',
  'steam',
  'steam square',
  'steam symbol',
  'sticker mule',
  'strava',
  'stripe',
  'stripe s',
  'studiovinari',
  'stumbleupon',
  'stumbleupon circle',
  'superpowers',
  'supple',
  'telegram',
  'telegram plane',
  'tencent weibo',
  'themeisle',
  'trello',
  'tripadvisor',
  'tumblr',
  'tumblr square',
  'twitch',
  'twitter',
  'twitter square',
  'typo3',
  'uber',
  'uikit',
  'uniregistry',
  'untappd',
  'usb',
  'ussunnah',
  'vaadin',
  'viacoin',
  'viadeo',
  'viadeo square',
  'viber',
  'vimeo',
  'vimeo square',
  'vimeo v',
  'vine',
  'vk',
  'vnv',
  'vuejs',
  'wechat',
  'weibo',
  'weixin',
  'whatsapp',
  'whatsapp square',
  'whmcs',
  'wikipedia w',
  'windows',
  'wordpress',
  'wordpress simple',
  'wpbeginner',
  'wpexplorer',
  'wpforms',
  'xbox',
  'xing',
  'xing square',
  'y combinator',
  'yahoo',
  'yandex',
  'yandex international',
  'yelp',
  'yoast',
  'youtube',
  'youtube square',
]
export const ICONS = _.uniq([
  ...ACCESSIBILITY,
  ...ARROWS,
  ...AUDIO_VIDEO,
  ...BUSINESS,
  ...CHESS,
  ...CODE,
  ...COMMUNICATION,
  ...COMPUTERS,
  ...CURRENCY,
  ...DATE_TIME,
  ...DESIGN,
  ...EDITORS,
  ...FILES,
  ...GENDERS,
  ...HANDS_GESTURES,
  ...HEALTH,
  ...IMAGES,
  ...INTERFACES,
  ...LOGISTICS,
  ...MAPS,
  ...MEDICAL,
  ...OBJECTS,
  ...PAYMENTS_SHOPPING,
  ...SHAPES,
  ...SPINNERS,
  ...SPORTS,
  ...STATUS,
  ...USERS_PEOPLE,
  ...VEHICLES,
  ...WRITING,
  ...BRANDS,
])
export const ICON_ALIASES = [
  'chess rock',
  'ordered list',
  'unordered list',
  'user doctor',
  'shield',
  'puzzle',
  'add circle',
  'add square',
  'add to calendar',
  'add to cart',
  'add user',
  'add',
  'alarm mute',
  'alarm',
  'ald',
  'als',
  'announcement',
  'area chart',
  'area graph',
  'arrow down cart',
  'asexual',
  'asl interpreting',
  'asl',
  'assistive listening devices',
  'attach',
  'attention',
  'balance',
  'bar',
  'bathtub',
  'battery four',
  'battery high',
  'battery low',
  'battery one',
  'battery three',
  'battery two',
  'battery zero',
  'birthday',
  'block layout',
  'bluetooth alternative',
  'broken chain',
  'browser',
  'call square',
  'call',
  'cancel',
  'cart',
  'cc',
  'chain',
  'chat',
  'checked calendar',
  'checkmark',
  'circle notched',
  'close',
  'cny',
  'cocktail',
  'commenting',
  'computer',
  'configure',
  'content',
  'deafness',
  'delete calendar',
  'delete',
  'detective',
  'discussions',
  'doctor',
  'dollar',
  'dont',
  'drivers license',
  'dropdown',
  'emergency',
  'envira gallery',
  'erase',
  'eur',
  'euro',
  'eyedropper',
  'factory',
  'favorite',
  'feed',
  'female homosexual',
  'file text',
  'file text outline',
  'find',
  'first aid',
  'fork',
  'game',
  'gay',
  'gbp',
  'google plus circle',
  'google plus official',
  'grab',
  'graduation',
  'grid layout',
  'group',
  'h',
  'hand victory',
  'handicap',
  'hard of hearing',
  'header',
  'help circle',
  'help',
  'heterosexual',
  'hide',
  'hotel',
  'hourglass four',
  'hourglass full',
  'hourglass one',
  'hourglass three',
  'hourglass two',
  'idea',
  'ils',
  'in cart',
  'inr',
  'intergender',
  'intersex',
  'jpy',
  'krw',
  'lab',
  'law',
  'legal',
  'lesbian',
  'lightning',
  'like',
  'line graph',
  'linkedin square',
  'linkify',
  'lira',
  'list layout',
  'magnify',
  'mail forward',
  'mail outline',
  'mail square',
  'mail',
  'male homosexual',
  'man',
  'marker',
  'mars alternate',
  'mars horizontal',
  'mars vertical',
  'microsoft edge',
  'military',
  'ms edge',
  'mute',
  'new pied piper',
  'non binary transgender',
  'numbered list',
  'options',
  'other gender horizontal',
  'other gender vertical',
  'other gender',
  'payment',
  'paypal card',
  'pencil square',
  'photo',
  'picture',
  'pie chart',
  'pie graph',
  'pied piper hat',
  'pin',
  'plus cart',
  'point',
  'pointing down',
  'pointing left',
  'pointing right',
  'pointing up',
  'pound',
  'power cord',
  'power',
  'privacy',
  'r circle',
  'rain',
  'record',
  'refresh',
  'remove circle',
  'remove from calendar',
  'remove user',
  'remove',
  'repeat',
  'rmb',
  'rouble',
  'rub',
  'ruble',
  'rupee',
  's15',
  'selected radio',
  'send',
  'setting',
  'settings',
  'shekel',
  'sheqel',
  'shipping',
  'shop',
  'shuffle',
  'shutdown',
  'sidebar',
  'signing',
  'signup',
  'sliders',
  'soccer',
  'sort alphabet ascending',
  'sort alphabet descending',
  'sort ascending',
  'sort content ascending',
  'sort content descending',
  'sort descending',
  'sort numeric ascending',
  'sort numeric descending',
  'sound',
  'spy',
  'stripe card',
  'student',
  'talk',
  'target',
  'teletype',
  'television',
  'text cursor',
  'text telephone',
  'theme',
  'thermometer',
  'thumb tack',
  'time',
  'tm',
  'toggle down',
  'toggle left',
  'toggle right',
  'toggle up',
  'translate',
  'travel',
  'treatment',
  'triangle down',
  'triangle left',
  'triangle right',
  'triangle up',
  'try',
  'unhide',
  'unlinkify',
  'unmute',
  'usd',
  'user cancel',
  'user close',
  'user delete',
  'user x',
  'vcard',
  'video camera',
  'video play',
  'volume control phone',
  'wait',
  'warning circle',
  'warning sign',
  'warning',
  'wi-fi',
  'winner',
  'wizard',
  'woman',
  'won',
  'wordpress beginner',
  'wordpress forms',
  'world',
  'write square',
  'x',
  'yen',
  'zip',
  'zoom in',
  'zoom out',
  'zoom',
  'bitbucket square',
  'checkmark box',
  'circle thin',
  'cloud download',
  'cloud upload',
  'compose',
  'conversation',
  'credit card alternative',
  'currency',
  'dashboard',
  'diamond',
  'disk',
  'exchange',
  'external share',
  'external square',
  'external',
  'facebook official',
  'food',
  'hourglass zero',
  'level down',
  'level up',
  'log out',
  'meanpath',
  'money',
  'move',
  'pencil',
  'protect',
  'radio',
  'remove bookmark',
  'resize horizontal',
  'resize vertical',
  'sign in',
  'sign out',
  'spoon',
  'star half empty',
  'star half full',
  'ticket',
  'times rectangle',
  'write',
  'youtube play',
]
export const ICONS_AND_ALIASES = _.uniq([...ICONS, ...ICON_ALIASES])
export const COMPONENT_CONTEXT_SPECIFIC_ICONS = [
  'left dropdown',
]
export const ALL_ICONS_IN_ALL_CONTEXTS = _.uniq([
  ...ICONS_AND_ALIASES,
  ...COMPONENT_CONTEXT_SPECIFIC_ICONS,
])
````

## File: modules/Accordion/Accordion.d.ts/Accordion.d.ts
````typescript
import AccordionAccordion, { StrictAccordionAccordionProps } from './AccordionAccordion'
import AccordionContent from './AccordionContent'
import AccordionPanel from './AccordionPanel'
import AccordionTitle from './AccordionTitle'
import { ForwardRefComponent } from '../../generic'
export interface AccordionProps extends StrictAccordionProps {
  [key: string]: any
}
export interface StrictAccordionProps extends StrictAccordionAccordionProps {
  className?: string
  fluid?: boolean
  inverted?: boolean
  styled?: boolean
}
declare const Accordion: ForwardRefComponent<AccordionProps, HTMLDivElement> & {
  Accordion: typeof AccordionAccordion
  Content: typeof AccordionContent
  Panel: typeof AccordionPanel
  Title: typeof AccordionTitle
}
export default Accordion
````

## File: modules/Accordion/Accordion.js/Accordion.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getUnhandledProps, getKeyOnly } from '../../lib'
import AccordionAccordion from './AccordionAccordion'
import AccordionContent from './AccordionContent'
import AccordionPanel from './AccordionPanel'
import AccordionTitle from './AccordionTitle'
const Accordion = React.forwardRef(function (props, ref) {
  const { className, fluid, inverted, styled } = props
  const classes = cx(
    'ui',
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(styled, 'styled'),
    className,
  )
  const rest = getUnhandledProps(Accordion, props)
  return <AccordionAccordion {...rest} className={classes} ref={ref} />
})
Accordion.displayName = 'Accordion'
Accordion.propTypes = {
  className: PropTypes.string,
  fluid: PropTypes.bool,
  inverted: PropTypes.bool,
  styled: PropTypes.bool,
}
Accordion.Accordion = AccordionAccordion
Accordion.Content = AccordionContent
Accordion.Panel = AccordionPanel
Accordion.Title = AccordionTitle
export default Accordion
````

## File: modules/Accordion/AccordionAccordion.d.ts/AccordionAccordion.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandCollection } from '../../generic'
import { AccordionPanelProps } from './AccordionPanel'
import { AccordionTitleProps } from './AccordionTitle'
export interface AccordionAccordionProps extends StrictAccordionAccordionProps {
  [key: string]: any
}
export interface StrictAccordionAccordionProps {
  as?: any
  activeIndex?: number | number[]
  children?: React.ReactNode
  className?: string
  defaultActiveIndex?: number | number[]
  exclusive?: boolean
  onTitleClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void
  panels?: SemanticShorthandCollection<AccordionPanelProps>
}
declare const AccordionAccordion: ForwardRefComponent<AccordionAccordionProps, HTMLDivElement>
export default AccordionAccordion
````

## File: modules/Accordion/AccordionAccordion.js/AccordionAccordion.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  useAutoControlledValue,
  useEventCallback,
} from '../../lib'
import AccordionPanel from './AccordionPanel'
function isIndexActive(exclusive, activeIndex, itemIndex) {
  return exclusive ? activeIndex === itemIndex : _.includes(activeIndex, itemIndex)
}
function computeNewIndex(exclusive, activeIndex, itemIndex) {
  if (exclusive) {
    return itemIndex === activeIndex ? -1 : itemIndex
  }
  if (_.includes(activeIndex, itemIndex)) {
    return _.without(activeIndex, itemIndex)
  }
  return [...activeIndex, itemIndex]
}
const AccordionAccordion = React.forwardRef(function (props, ref) {
  const { className, children, exclusive = true, panels } = props
  const [activeIndex, setActiveIndex] = useAutoControlledValue({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: () => (exclusive ? -1 : []),
  })
  const classes = cx('accordion', className)
  const rest = getUnhandledProps(AccordionAccordion, props)
  const ElementType = getComponentType(props)
  const handleTitleClick = useEventCallback((e, titleProps) => {
    const { index } = titleProps
    setActiveIndex(computeNewIndex(exclusive, activeIndex, index))
    _.invoke(props, 'onTitleClick', e, titleProps)
  })
  if (process.env.NODE_ENV !== 'production') {
    React.useEffect(() => {
      if (exclusive && typeof activeIndex !== 'number') {
        console.error('`activeIndex` must be a number if `exclusive` is true')
      } else if (!exclusive && !_.isArray(activeIndex)) {
        console.error('`activeIndex` must be an array if `exclusive` is false')
      }
    }, [exclusive, activeIndex])
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children)
        ? _.map(panels, (panel, index) =>
            AccordionPanel.create(panel, {
              defaultProps: {
                active: isIndexActive(exclusive, activeIndex, index),
                index,
                onTitleClick: handleTitleClick,
              },
            }),
          )
        : children}
    </ElementType>
  )
})
AccordionAccordion.displayName = 'AccordionAccordion'
AccordionAccordion.propTypes = {
  as: PropTypes.elementType,
  activeIndex: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  defaultActiveIndex: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  ]),
  exclusive: PropTypes.bool,
  onTitleClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
  panels: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.arrayOf(
      PropTypes.shape({
        content: customPropTypes.itemShorthand,
        title: customPropTypes.itemShorthand,
      }),
    ),
  ]),
}
AccordionAccordion.create = createShorthandFactory(AccordionAccordion, (content) => ({ content }))
export default AccordionAccordion
````

## File: modules/Accordion/AccordionContent.d.ts/AccordionContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface AccordionContentProps extends StrictAccordionContentProps {
  [key: string]: any
}
export interface StrictAccordionContentProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const AccordionContent: ForwardRefComponent<AccordionContentProps, HTMLDivElement>
export default AccordionContent
````

## File: modules/Accordion/AccordionContent.js/AccordionContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const AccordionContent = React.forwardRef(function (props, ref) {
  const { active, children, className, content } = props
  const classes = cx('content', getKeyOnly(active, 'active'), className)
  const rest = getUnhandledProps(AccordionContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
AccordionContent.displayName = 'AccordionContent'
AccordionContent.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
AccordionContent.create = createShorthandFactory(AccordionContent, (content) => ({ content }))
export default AccordionContent
````

## File: modules/Accordion/AccordionPanel.d.ts/AccordionPanel.d.ts
````typescript
import * as React from 'react'
import { SemanticShorthandItem } from '../../generic'
import { AccordionContentProps } from './AccordionContent'
import { AccordionTitleProps } from './AccordionTitle'
export interface AccordionPanelProps extends StrictAccordionPanelProps {
  [key: string]: any
}
export interface StrictAccordionPanelProps {
  active?: boolean
  content?: SemanticShorthandItem<AccordionContentProps>
  index?: number | string
  onTitleClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void
  title?: SemanticShorthandItem<AccordionTitleProps>
}
declare const AccordionPanel: React.ComponentClass<AccordionPanelProps>
export default AccordionPanel
````

## File: modules/Accordion/AccordionPanel.js/AccordionPanel.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { createShorthandFactory, customPropTypes } from '../../lib'
import AccordionTitle from './AccordionTitle'
import AccordionContent from './AccordionContent'
class AccordionPanel extends Component {
  handleTitleOverrides = (predefinedProps) => ({
    onClick: (e, titleProps) => {
      _.invoke(predefinedProps, 'onClick', e, titleProps)
      _.invoke(this.props, 'onTitleClick', e, titleProps)
    },
  })
  render() {
    const { active, content, index, title } = this.props
    return (
      <>
        {AccordionTitle.create(title, {
          autoGenerateKey: false,
          defaultProps: { active, index },
          overrideProps: this.handleTitleOverrides,
        })}
        {AccordionContent.create(content, {
          autoGenerateKey: false,
          defaultProps: { active },
        })}
      </>
    )
  }
}
AccordionPanel.propTypes = {
  active: PropTypes.bool,
  content: customPropTypes.itemShorthand,
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onTitleClick: PropTypes.func,
  title: customPropTypes.itemShorthand,
}
AccordionPanel.create = createShorthandFactory(AccordionPanel, null)
export default AccordionPanel
````

## File: modules/Accordion/AccordionTitle.d.ts/AccordionTitle.d.ts
````typescript
import * as React from 'react'
import { IconProps } from '../../elements/Icon'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
export interface AccordionTitleProps extends StrictAccordionTitleProps {
  [key: string]: any
}
export interface StrictAccordionTitleProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  icon?: SemanticShorthandItem<IconProps>
  index?: number | string
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: AccordionTitleProps) => void
}
declare const AccordionTitle: ForwardRefComponent<AccordionTitleProps, HTMLDivElement>
export default AccordionTitle
````

## File: modules/Accordion/AccordionTitle.js/AccordionTitle.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
import Icon from '../../elements/Icon'
const AccordionTitle = React.forwardRef(function (props, ref) {
  const { active, children, className, content, icon } = props
  const classes = cx(getKeyOnly(active, 'active'), 'title', className)
  const rest = getUnhandledProps(AccordionTitle, props)
  const ElementType = getComponentType(props)
  const iconValue = _.isNil(icon) ? 'dropdown' : icon
  const handleClick = useEventCallback((e) => {
    _.invoke(props, 'onClick', e, props)
  })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
      {Icon.create(iconValue, { autoGenerateKey: false })}
      {content}
    </ElementType>
  )
})
AccordionTitle.displayName = 'AccordionTitle'
AccordionTitle.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  icon: customPropTypes.itemShorthand,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
}
AccordionTitle.create = createShorthandFactory(AccordionTitle, (content) => ({ content }))
export default AccordionTitle
````

## File: modules/Accordion/index.d.ts/index.d.ts
````typescript
export { default, AccordionProps, StrictAccordionProps } from './Accordion'
````

## File: modules/Accordion/index.js/index.js
````javascript
export default from './Accordion'
````

## File: modules/Checkbox/Checkbox.d.ts/Checkbox.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, HtmlLabelProps, SemanticShorthandItem } from '../../generic'
export interface CheckboxProps extends StrictCheckboxProps {
  [key: string]: any
}
export interface StrictCheckboxProps {
  as?: any
  checked?: boolean
  className?: string
  defaultChecked?: boolean
  defaultIndeterminate?: boolean
  disabled?: boolean
  fitted?: boolean
  id?: number | string
  indeterminate?: boolean
  label?: SemanticShorthandItem<HtmlLabelProps>
  name?: string
  onChange?: (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) => void
  onClick?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void
  onMouseDown?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void
  onMouseUp?: (event: React.MouseEvent<HTMLInputElement>, data: CheckboxProps) => void
  radio?: boolean
  readOnly?: boolean
  slider?: boolean
  tabIndex?: number | string
  toggle?: boolean
  type?: 'checkbox' | 'radio'
  value?: number | string
}
declare const Checkbox: ForwardRefComponent<CheckboxProps, HTMLDivElement>
export default Checkbox
````

## File: modules/Checkbox/Checkbox.js/Checkbox.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  createHTMLLabel,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  htmlInputAttrs,
  makeDebugger,
  partitionHTMLProps,
  getKeyOnly,
  useAutoControlledValue,
  useMergedRefs,
  useIsomorphicLayoutEffect,
} from '../../lib'
const debug = makeDebugger('checkbox')
const Checkbox = React.forwardRef(function (props, ref) {
  const {
    className,
    disabled,
    label,
    id,
    name,
    radio,
    readOnly,
    slider,
    tabIndex,
    toggle,
    type = 'checkbox',
    value,
  } = props
  const [checked, setChecked] = useAutoControlledValue({
    state: props.checked,
    defaultState: props.defaultChecked,
    initialState: false,
  })
  const [indeterminate, setIndeterminate] = useAutoControlledValue({
    state: props.indeterminate,
    defaultState: props.defaultIndeterminate,
    initialState: false,
  })
  const inputRef = useMergedRefs(React.useRef(), ref)
  const labelRef = React.useRef()
  const isClickFromMouse = React.useRef()
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate
    }
  })
  const canToggle = () => {
    return !disabled && !readOnly && !(radio && checked)
  }
  const computeTabIndex = () => {
    if (!_.isNil(tabIndex)) {
      return tabIndex
    }
    return disabled ? -1 : 0
  }
  const handleChange = (e) => {
    if (!canToggle()) {
      return
    }
    debug('handleChange()', _.get(e, 'target.tagName'))
    _.invoke(props, 'onChange', e, {
      ...props,
      checked: !checked,
      indeterminate: false,
    })
    setChecked(!checked)
    setIndeterminate(false)
  }
  const handleClick = (e) => {
    debug('handleClick()', _.get(e, 'target.tagName'))
    const isInputClick = _.invoke(inputRef.current, 'contains', e.target)
    const isLabelClick = _.invoke(labelRef.current, 'contains', e.target)
    const isRootClick = !isLabelClick && !isInputClick
    const hasId = !_.isNil(id)
    const isLabelClickAndForwardedToInput = isLabelClick && hasId
    if (!isLabelClickAndForwardedToInput) {
      _.invoke(props, 'onClick', e, {
        ...props,
        checked: !checked,
        indeterminate: !!indeterminate,
      })
    }
    if (isClickFromMouse.current) {
      isClickFromMouse.current = false
      if (isLabelClick && !hasId) {
        handleChange(e)
      }
      if (isRootClick) {
        handleChange(e)
      }
      if (isLabelClick && hasId) {
        e.stopPropagation()
      }
    }
  }
  const handleMouseDown = (e) => {
    debug('handleMouseDown()')
    _.invoke(props, 'onMouseDown', e, {
      ...props,
      checked: !!checked,
      indeterminate: !!indeterminate,
    })
    if (!e.defaultPrevented) {
      _.invoke(inputRef.current, 'focus')
    }
    e.preventDefault()
  }
  const handleMouseUp = (e) => {
    debug('handleMouseUp()')
    isClickFromMouse.current = true
    _.invoke(props, 'onMouseUp', e, {
      ...props,
      checked: !!checked,
      indeterminate: !!indeterminate,
    })
  }
  const classes = cx(
    'ui',
    getKeyOnly(checked, 'checked'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(indeterminate, 'indeterminate'),
    getKeyOnly(_.isNil(label), 'fitted'),
    getKeyOnly(radio, 'radio'),
    getKeyOnly(readOnly, 'read-only'),
    getKeyOnly(slider, 'slider'),
    getKeyOnly(toggle, 'toggle'),
    'checkbox',
    className,
  )
  const unhandled = getUnhandledProps(Checkbox, props)
  const ElementType = getComponentType(props)
  const [htmlInputProps, rest] = partitionHTMLProps(unhandled, { htmlProps: htmlInputAttrs })
  const labelElement = createHTMLLabel(label, {
    defaultProps: { htmlFor: id },
    autoGenerateKey: false,
  }) || <label htmlFor={id} />
  return (
    <ElementType
      {...rest}
      className={classes}
      onClick={handleClick}
      onChange={handleChange}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <input
        {...htmlInputProps}
        checked={checked}
        className='hidden'
        disabled={disabled}
        id={id}
        name={name}
        readOnly
        ref={inputRef}
        tabIndex={computeTabIndex()}
        type={type}
        value={value}
      />
      {React.cloneElement(labelElement, { ref: labelRef })}
    </ElementType>
  )
})
Checkbox.displayName = 'Checkbox'
Checkbox.propTypes = {
  as: PropTypes.elementType,
  checked: PropTypes.bool,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  defaultIndeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  fitted: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  indeterminate: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  radio: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['slider', 'toggle'])]),
  readOnly: PropTypes.bool,
  slider: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'toggle'])]),
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggle: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['radio', 'slider'])]),
  type: PropTypes.oneOf(['checkbox', 'radio']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
export default Checkbox
````

## File: modules/Checkbox/index.d.ts/index.d.ts
````typescript
export { default, CheckboxProps, StrictCheckboxProps } from './Checkbox'
````

## File: modules/Checkbox/index.js/index.js
````javascript
export default from './Checkbox'
````

## File: modules/Dimmer/Dimmer.d.ts/Dimmer.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
import DimmerDimmable from './DimmerDimmable'
import DimmerInner from './DimmerInner'
export interface DimmerProps extends StrictDimmerProps {
  [key: string]: any
}
export interface StrictDimmerProps {
  active?: boolean
  page?: boolean
}
declare const Dimmer: ForwardRefComponent<DimmerProps, HTMLDivElement> & {
  Dimmable: typeof DimmerDimmable
  Inner: typeof DimmerInner
}
export default Dimmer
````

## File: modules/Dimmer/Dimmer.js/Dimmer.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
import { createShorthandFactory, getUnhandledProps, isBrowser } from '../../lib'
import Portal from '../../addons/Portal'
import DimmerDimmable from './DimmerDimmable'
import DimmerInner from './DimmerInner'
const Dimmer = React.forwardRef(function (props, ref) {
  const { active, page } = props
  const rest = getUnhandledProps(Dimmer, props)
  if (page) {
    const handlePortalMount = () => {
      if (!isBrowser()) {
        return
      }
      document.body.classList.add('dimmed')
      document.body.classList.add('dimmable')
    }
    const handlePortalUnmount = () => {
      if (!isBrowser()) {
        return
      }
      document.body.classList.remove('dimmed')
      document.body.classList.remove('dimmable')
    }
    return (
      <Portal
        closeOnEscape={false}
        closeOnDocumentClick={false}
        onMount={handlePortalMount}
        onUnmount={handlePortalUnmount}
        open={active}
        openOnTriggerClick={false}
      >
        <DimmerInner {...rest} active={active} page={page} ref={ref} />
      </Portal>
    )
  }
  return <DimmerInner {...rest} active={active} page={page} ref={ref} />
})
Dimmer.displayName = 'Dimmer'
Dimmer.propTypes = {
  active: PropTypes.bool,
  page: PropTypes.bool,
}
Dimmer.Dimmable = DimmerDimmable
Dimmer.Inner = DimmerInner
Dimmer.create = createShorthandFactory(Dimmer, (value) => ({ content: value }))
export default Dimmer
````

## File: modules/Dimmer/DimmerDimmable.d.ts/DimmerDimmable.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface DimmerDimmableProps extends StrictDimmerDimmableProps {
  [key: string]: any
}
export interface StrictDimmerDimmableProps {
  as?: any
  blurring?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  dimmed?: boolean
}
declare const DimmerDimmable: ForwardRefComponent<DimmerDimmableProps, HTMLDivElement>
export default DimmerDimmable
````

## File: modules/Dimmer/DimmerDimmable.js/DimmerDimmable.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const DimmerDimmable = React.forwardRef(function (props, ref) {
  const { blurring, className, children, content, dimmed } = props
  const classes = cx(
    getKeyOnly(blurring, 'blurring'),
    getKeyOnly(dimmed, 'dimmed'),
    'dimmable',
    className,
  )
  const rest = getUnhandledProps(DimmerDimmable, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
DimmerDimmable.displayName = 'DimmerDimmable'
DimmerDimmable.propTypes = {
  as: PropTypes.elementType,
  blurring: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  dimmed: PropTypes.bool,
}
export default DimmerDimmable
````

## File: modules/Dimmer/DimmerInner.d.ts/DimmerInner.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface DimmerInnerProps extends StrictDimmerInnerProps {
  [key: string]: any
}
export interface StrictDimmerInnerProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: DimmerInnerProps) => void
  onClickOutside?: (event: React.MouseEvent<HTMLDivElement>, data: DimmerInnerProps) => void
  inverted?: boolean
  page?: boolean
  simple?: boolean
  verticalAlign?: 'bottom' | 'top'
}
declare const DimmerInner: ForwardRefComponent<DimmerInnerProps, HTMLDivElement>
export default DimmerInner
````

## File: modules/Dimmer/DimmerInner.js/DimmerInner.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  getVerticalAlignProp,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '../../lib'
const DimmerInner = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    disabled,
    inverted,
    page,
    simple,
    verticalAlign,
  } = props
  const containerRef = useMergedRefs(ref, React.useRef())
  const contentRef = React.useRef()
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current?.style) {
      return
    }
    if (active) {
      containerRef.current.style.setProperty('display', 'flex', 'important')
    } else {
      containerRef.current.style.removeProperty('display')
    }
  }, [active])
  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, props)
    if (contentRef.current !== e.target && doesNodeContainClick(contentRef.current, e)) {
      return
    }
    _.invoke(props, 'onClickOutside', e, props)
  }
  const classes = cx(
    'ui',
    getKeyOnly(active, 'active transition visible'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(page, 'page'),
    getKeyOnly(simple, 'simple'),
    getVerticalAlignProp(verticalAlign),
    'dimmer',
    className,
  )
  const rest = getUnhandledProps(DimmerInner, props)
  const ElementType = getComponentType(props)
  const childrenContent = childrenUtils.isNil(children) ? content : children
  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={containerRef}>
      {childrenContent && (
        <div className='content' ref={contentRef}>
          {childrenContent}
        </div>
      )}
    </ElementType>
  )
})
DimmerInner.displayName = 'DimmerInner'
DimmerInner.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onClickOutside: PropTypes.func,
  inverted: PropTypes.bool,
  page: PropTypes.bool,
  simple: PropTypes.bool,
  verticalAlign: PropTypes.oneOf(['bottom', 'top']),
}
export default DimmerInner
````

## File: modules/Dimmer/index.d.ts/index.d.ts
````typescript
export { default, DimmerProps, StrictDimmerProps } from './Dimmer'
````

## File: modules/Dimmer/index.js/index.js
````javascript
export default from './Dimmer'
````

## File: modules/Dropdown/Dropdown.d.ts/Dropdown.d.ts
````typescript
import * as React from 'react'
import { LabelProps } from '../../elements/Label'
import DropdownDivider from './DropdownDivider'
import DropdownHeader from './DropdownHeader'
import DropdownItem, { DropdownItemProps } from './DropdownItem'
import DropdownMenu from './DropdownMenu'
import DropdownSearchInput from './DropdownSearchInput'
import { ForwardRefComponent } from '../../generic'
export interface DropdownProps extends StrictDropdownProps {
  [key: string]: any
}
export interface StrictDropdownProps {
  as?: any
  additionLabel?: number | string | React.ReactNode
  additionPosition?: 'top' | 'bottom'
  allowAdditions?: boolean
  basic?: boolean
  button?: boolean
  children?: React.ReactNode
  className?: string
  clearable?: boolean
  closeOnBlur?: boolean
  closeOnEscape?: boolean
  closeOnChange?: boolean
  compact?: boolean
  deburr?: boolean
  defaultOpen?: boolean
  defaultSearchQuery?: string
  defaultSelectedLabel?: number | string
  defaultUpward?: boolean
  defaultValue?: string | number | boolean | (number | string | boolean)[]
  direction?: 'left' | 'right'
  disabled?: boolean
  error?: boolean
  floating?: boolean
  fluid?: boolean
  header?: React.ReactNode
  icon?: any
  inline?: boolean
  item?: boolean
  labeled?: boolean
  lazyLoad?: boolean
  loading?: boolean
  minCharacters?: number
  multiple?: boolean
  noResultsMessage?: React.ReactNode
  onAddItem?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void
  onBlur?: (event: React.FocusEvent<HTMLElement>, data: DropdownProps) => void
  onChange?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void
  onClick?: (event: React.MouseEvent<HTMLElement>, data: DropdownProps) => void
  onClose?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void
  onFocus?: (event: React.FocusEvent<HTMLElement>, data: DropdownProps) => void
  onLabelClick?: (event: React.MouseEvent<HTMLElement>, data: LabelProps) => void
  onMouseDown?: (event: React.MouseEvent<HTMLElement>, data: DropdownProps) => void
  onOpen?: (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void
  onSearchChange?: (
    event: React.SyntheticEvent<HTMLElement>,
    data: DropdownOnSearchChangeData,
  ) => void
  open?: boolean
  openOnFocus?: boolean
  options?: DropdownItemProps[]
  placeholder?: string
  pointing?:
    | boolean
    | 'left'
    | 'right'
    | 'top'
    | 'top left'
    | 'top right'
    | 'bottom'
    | 'bottom left'
    | 'bottom right'
  renderLabel?: (item: DropdownItemProps, index: number, defaultLabelProps: LabelProps) => any
  scrolling?: boolean
  search?: boolean | ((options: DropdownItemProps[], value: string) => DropdownItemProps[])
  searchInput?: any
  searchQuery?: string
  selectOnBlur?: boolean
  selectOnNavigation?: boolean
  selectedLabel?: number | string
  selection?: any
  simple?: boolean
  tabIndex?: number | string
  text?: string
  trigger?: React.ReactNode
  value?: boolean | number | string | (boolean | number | string)[]
  upward?: boolean
  wrapSelection?: boolean
}
export interface DropdownOnSearchChangeData extends DropdownProps {
  searchQuery: string
}
declare const Dropdown: ForwardRefComponent<DropdownProps, HTMLDivElement> & {
  Divider: typeof DropdownDivider
  Header: typeof DropdownHeader
  Item: typeof DropdownItem
  Menu: typeof DropdownMenu
  SearchInput: typeof DropdownSearchInput
}
export default Dropdown
````

## File: modules/Dropdown/Dropdown.js/Dropdown.js
````javascript
import EventStack from '@semantic-ui-react/event-stack'
import cx from 'clsx'
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Children, cloneElement, createRef } from 'react'
import shallowEqual from 'shallowequal'
import {
  ModernAutoControlledComponent as Component,
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  getComponentType,
  getUnhandledProps,
  makeDebugger,
  objectDiff,
  setRef,
  getKeyOnly,
  getKeyOrValueAndKey,
} from '../../lib'
import Icon from '../../elements/Icon'
import Label from '../../elements/Label'
import Flag from '../../elements/Flag'
import Image from '../../elements/Image'
import DropdownDivider from './DropdownDivider'
import DropdownItem from './DropdownItem'
import DropdownHeader from './DropdownHeader'
import DropdownMenu from './DropdownMenu'
import DropdownSearchInput from './DropdownSearchInput'
import DropdownText from './DropdownText'
import getMenuOptions from './utils/getMenuOptions'
import getSelectedIndex from './utils/getSelectedIndex'
const debug = makeDebugger('dropdown')
const getKeyOrValue = (key, value) => (_.isNil(key) ? value : key)
const getKeyAndValues = (options) =>
  options ? options.map((option) => _.pick(option, ['key', 'value'])) : options
function renderItemContent(item) {
  const { flag, image, text } = item
  if (_.isFunction(text)) {
    return text
  }
  return {
    content: (
      <>
        {Flag.create(flag)}
        {Image.create(image)}
        {text}
      </>
    ),
  }
}
const Dropdown = React.forwardRef((props, ref) => {
  const {
    additionLabel = 'Add ',
    additionPosition = 'top',
    closeOnBlur = true,
    closeOnEscape = true,
    deburr = false,
    icon = 'dropdown',
    minCharacters = 1,
    noResultsMessage = 'No results found.',
    openOnFocus = true,
    renderLabel = renderItemContent,
    searchInput = 'text',
    selectOnBlur = true,
    selectOnNavigation = true,
    wrapSelection = true,
    ...rest
  } = props
  return (
    <DropdownInner
      additionLabel={additionLabel}
      additionPosition={additionPosition}
      closeOnBlur={closeOnBlur}
      closeOnEscape={closeOnEscape}
      deburr={deburr}
      icon={icon}
      minCharacters={minCharacters}
      noResultsMessage={noResultsMessage}
      openOnFocus={openOnFocus}
      renderLabel={renderLabel}
      searchInput={searchInput}
      selectOnBlur={selectOnBlur}
      selectOnNavigation={selectOnNavigation}
      wrapSelection={wrapSelection}
      {...rest}
      innerRef={ref}
    />
  )
})
class DropdownInner extends Component {
  searchRef = createRef()
  sizerRef = createRef()
  ref = createRef()
  handleRef = (el) => {
    this.ref.current = el
    setRef(this.props.innerRef, el)
  }
  getInitialAutoControlledState() {
    return { focus: false, searchQuery: '' }
  }
  static getAutoControlledStateFromProps(nextProps, computedState, prevState) {
    // These values are stored only for a comparison on next getAutoControlledStateFromProps()
    const derivedState = { __options: nextProps.options, __value: computedState.value }
    // The selected index is only dependent:
    const shouldComputeSelectedIndex =
      // On value change
      !shallowEqual(prevState.__value, computedState.value) ||
      // On option keys/values, we only check those properties to avoid recursive performance impacts.
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/3000
      !_.isEqual(getKeyAndValues(nextProps.options), getKeyAndValues(prevState.__options))
    if (shouldComputeSelectedIndex) {
      derivedState.selectedIndex = getSelectedIndex({
        additionLabel: nextProps.additionLabel,
        additionPosition: nextProps.additionPosition,
        allowAdditions: nextProps.allowAdditions,
        deburr: nextProps.deburr,
        multiple: nextProps.multiple,
        search: nextProps.search,
        selectedIndex: computedState.selectedIndex,
        value: computedState.value,
        options: nextProps.options,
        searchQuery: computedState.searchQuery,
      })
    }
    return derivedState
  }
  componentDidMount() {
    debug('componentDidMount()')
    const { open } = this.state
    if (open) {
      this.open(null, false)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
  }
  componentDidUpdate(prevProps, prevState) {
    // eslint-disable-line complexity
    debug('componentDidUpdate()')
    debug('to state:', objectDiff(prevState, this.state))
    const { closeOnBlur, minCharacters, openOnFocus, search } = this.props
    /* eslint-disable no-console */
    if (process.env.NODE_ENV !== 'production') {
      const isNextValueArray = Array.isArray(this.props.value)
      const hasValue = _.has(this.props, 'value')
      if (hasValue && this.props.multiple && !isNextValueArray) {
        console.error(
          'Dropdown `value` must be an array when `multiple` is set.' +
            ` Received type: \`${Object.prototype.toString.call(this.props.value)}\`.`,
        )
      } else if (hasValue && !this.props.multiple && isNextValueArray) {
        console.error(
          'Dropdown `value` must not be an array when `multiple` is not set.' +
            ' Either set `multiple={true}` or use a string or number value.',
        )
      }
    }
    if (!prevState.focus && this.state.focus) {
      debug('dropdown focused')
      if (!this.isMouseDown) {
        const openable = !search || (search && minCharacters === 1 && !this.state.open)
        debug('mouse is not down, opening')
        if (openOnFocus && openable) this.open()
      }
    } else if (prevState.focus && !this.state.focus) {
      debug('dropdown blurred')
      if (!this.isMouseDown && closeOnBlur) {
        debug('mouse is not down and closeOnBlur=true, closing')
        this.close()
      }
    }
    if (!prevState.open && this.state.open) {
      debug('dropdown opened')
      this.setOpenDirection()
      this.scrollSelectedItemIntoView()
    } else if (prevState.open && !this.state.open) {
      debug('dropdown closed')
    }
    if (prevState.selectedIndex !== this.state.selectedIndex) {
      this.scrollSelectedItemIntoView()
    }
  }
  handleChange = (e, value) => {
    debug('handleChange()', value)
    _.invoke(this.props, 'onChange', e, { ...this.props, value })
  }
  closeOnChange = (e) => {
    const { closeOnChange, multiple } = this.props
    const shouldClose = _.isUndefined(closeOnChange) ? !multiple : closeOnChange
    if (shouldClose) {
      this.close(e, _.noop)
    }
  }
  closeOnEscape = (e) => {
    if (!this.props.closeOnEscape) return
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return
    e.preventDefault()
    debug('closeOnEscape()')
    this.close(e)
  }
  moveSelectionOnKeyDown = (e) => {
    debug('moveSelectionOnKeyDown()', keyboardKey.getKey(e))
    const { multiple, selectOnNavigation } = this.props
    const { open } = this.state
    if (!open) {
      return
    }
    const moves = {
      [keyboardKey.ArrowDown]: 1,
      [keyboardKey.ArrowUp]: -1,
    }
    const move = moves[keyboardKey.getCode(e)]
    if (move === undefined) {
      return
    }
    e.preventDefault()
    const nextIndex = this.getSelectedIndexAfterMove(move)
    if (!multiple && selectOnNavigation) {
      this.makeSelectedItemActive(e, nextIndex)
    }
    this.setState({ selectedIndex: nextIndex })
  }
  openOnSpace = (e) => {
    debug('openOnSpace()')
    const shouldHandleEvent =
      this.state.focus && !this.state.open && keyboardKey.getCode(e) === keyboardKey.Spacebar
    const shouldPreventDefault =
      e.target?.tagName !== 'INPUT' &&
      e.target?.tagName !== 'TEXTAREA' &&
      e.target?.isContentEditable !== true
    if (shouldHandleEvent) {
      if (shouldPreventDefault) {
        e.preventDefault()
      }
      this.open(e)
    }
  }
  openOnArrow = (e) => {
    debug('openOnArrow()')
    const { focus, open } = this.state
    if (focus && !open) {
      const code = keyboardKey.getCode(e)
      if (code === keyboardKey.ArrowDown || code === keyboardKey.ArrowUp) {
        e.preventDefault()
        this.open(e)
      }
    }
  }
  makeSelectedItemActive = (e, selectedIndex) => {
    const { open, value } = this.state
    const { multiple } = this.props
    const item = this.getSelectedItem(selectedIndex)
    const selectedValue = _.get(item, 'value')
    const disabled = _.get(item, 'disabled')
    if (_.isNil(selectedValue) || !open || disabled) {
      return value
    }
    const newValue = multiple ? _.union(value, [selectedValue]) : selectedValue
    const valueHasChanged = multiple ? !!_.difference(newValue, value).length : newValue !== value
    if (valueHasChanged) {
      this.setState({ value: newValue })
      this.handleChange(e, newValue)
      if (item['data-additional']) {
        _.invoke(this.props, 'onAddItem', e, { ...this.props, value: selectedValue })
      }
    }
    return value
  }
  selectItemOnEnter = (e) => {
    debug('selectItemOnEnter()', keyboardKey.getKey(e))
    const { search } = this.props
    const { open, selectedIndex } = this.state
    if (!open) {
      return
    }
    const shouldSelect =
      keyboardKey.getCode(e) === keyboardKey.Enter ||
      (!search && keyboardKey.getCode(e) === keyboardKey.Spacebar)
    if (!shouldSelect) {
      return
    }
    e.preventDefault()
    const optionSize = _.size(
      getMenuOptions({
        value: this.state.value,
        options: this.props.options,
        searchQuery: this.state.searchQuery,
        additionLabel: this.props.additionLabel,
        additionPosition: this.props.additionPosition,
        allowAdditions: this.props.allowAdditions,
        deburr: this.props.deburr,
        multiple: this.props.multiple,
        search: this.props.search,
      }),
    )
    if (search && optionSize === 0) {
      return
    }
    const nextValue = this.makeSelectedItemActive(e, selectedIndex)
    this.setState({
      selectedIndex: getSelectedIndex({
        additionLabel: this.props.additionLabel,
        additionPosition: this.props.additionPosition,
        allowAdditions: this.props.allowAdditions,
        deburr: this.props.deburr,
        multiple: this.props.multiple,
        search: this.props.search,
        selectedIndex,
        value: nextValue,
        options: this.props.options,
        searchQuery: '',
      }),
    })
    this.closeOnChange(e)
    this.clearSearchQuery()
    if (search) {
      _.invoke(this.searchRef.current, 'focus')
    }
  }
  removeItemOnBackspace = (e) => {
    debug('removeItemOnBackspace()', keyboardKey.getKey(e))
    const { multiple, search } = this.props
    const { searchQuery, value } = this.state
    if (keyboardKey.getCode(e) !== keyboardKey.Backspace) return
    if (searchQuery || !search || !multiple || _.isEmpty(value)) return
    e.preventDefault()
    const newValue = _.dropRight(value)
    this.setState({ value: newValue })
    this.handleChange(e, newValue)
  }
  closeOnDocumentClick = (e) => {
    debug('closeOnDocumentClick()')
    debug(e)
    if (!this.props.closeOnBlur) return
    if (this.ref.current && doesNodeContainClick(this.ref.current, e)) return
    this.close()
  }
  handleMouseDown = (e) => {
    debug('handleMouseDown()')
    this.isMouseDown = true
    _.invoke(this.props, 'onMouseDown', e, this.props)
    document.addEventListener('mouseup', this.handleDocumentMouseUp)
  }
  handleDocumentMouseUp = () => {
    debug('handleDocumentMouseUp()')
    this.isMouseDown = false
    document.removeEventListener('mouseup', this.handleDocumentMouseUp)
  }
  handleClick = (e) => {
    debug('handleClick()', e)
    const { minCharacters, search } = this.props
    const { open, searchQuery } = this.state
    _.invoke(this.props, 'onClick', e, this.props)
    e.stopPropagation()
    if (!search) return this.toggle(e)
    if (open) {
      _.invoke(this.searchRef.current, 'focus')
      return
    }
    if (searchQuery.length >= minCharacters || minCharacters === 1) {
      this.open(e)
      return
    }
    _.invoke(this.searchRef.current, 'focus')
  }
  handleIconClick = (e) => {
    const { clearable } = this.props
    const hasValue = this.hasValue()
    debug('handleIconClick()', { e, clearable, hasValue })
    _.invoke(this.props, 'onClick', e, this.props)
    e.stopPropagation()
    if (clearable && hasValue) {
      this.clearValue(e)
    } else {
      this.toggle(e)
    }
  }
  handleItemClick = (e, item) => {
    debug('handleItemClick()', item)
    const { multiple, search } = this.props
    const { value: currentValue } = this.state
    const { value } = item
    e.stopPropagation()
    if (multiple || item.disabled) {
      e.nativeEvent.stopImmediatePropagation()
    }
    if (item.disabled) {
      return
    }
    const isAdditionItem = item['data-additional']
    const newValue = multiple ? _.union(this.state.value, [value]) : value
    const valueHasChanged = multiple
      ? !!_.difference(newValue, currentValue).length
      : newValue !== currentValue
    if (valueHasChanged) {
      this.setState({ value: newValue })
      this.handleChange(e, newValue)
    }
    this.clearSearchQuery()
    if (search) {
      _.invoke(this.searchRef.current, 'focus')
    } else {
      _.invoke(this.ref.current, 'focus')
    }
    this.closeOnChange(e)
    if (isAdditionItem) {
      _.invoke(this.props, 'onAddItem', e, { ...this.props, value })
    }
  }
  handleFocus = (e) => {
    debug('handleFocus()')
    const { focus } = this.state
    if (focus) return
    _.invoke(this.props, 'onFocus', e, this.props)
    this.setState({ focus: true })
  }
  handleBlur = (e) => {
    debug('handleBlur()')
    const currentTarget = _.get(e, 'currentTarget')
    if (currentTarget && currentTarget.contains(document.activeElement)) return
    const { closeOnBlur, multiple, selectOnBlur } = this.props
    if (this.isMouseDown) return
    _.invoke(this.props, 'onBlur', e, this.props)
    if (selectOnBlur && !multiple) {
      this.makeSelectedItemActive(e, this.state.selectedIndex)
      if (closeOnBlur) this.close()
    }
    this.setState({ focus: false })
    this.clearSearchQuery()
  }
  handleSearchChange = (e, { value }) => {
    debug('handleSearchChange()')
    debug(value)
    e.stopPropagation()
    const { minCharacters } = this.props
    const { open } = this.state
    const newQuery = value
    _.invoke(this.props, 'onSearchChange', e, { ...this.props, searchQuery: newQuery })
    this.setState({ searchQuery: newQuery, selectedIndex: 0 })
    if (!open && newQuery.length >= minCharacters) {
      this.open()
      return
    }
    if (open && minCharacters !== 1 && newQuery.length < minCharacters) this.close()
  }
  handleKeyDown = (e) => {
    this.moveSelectionOnKeyDown(e)
    this.openOnArrow(e)
    this.openOnSpace(e)
    this.selectItemOnEnter(e)
    _.invoke(this.props, 'onKeyDown', e)
  }
  getSelectedItem = (selectedIndex) => {
    const options = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,
      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    })
    return _.get(options, `[${selectedIndex}]`)
  }
  getItemByValue = (value) => {
    const { options } = this.props
    return _.find(options, { value })
  }
  getDropdownAriaOptions = () => {
    const { loading, disabled, search, multiple } = this.props
    const { open } = this.state
    const ariaOptions = {
      role: search ? 'combobox' : 'listbox',
      'aria-busy': loading,
      'aria-disabled': disabled,
      'aria-expanded': !!open,
    }
    if (ariaOptions.role === 'listbox') {
      ariaOptions['aria-multiselectable'] = multiple
    }
    return ariaOptions
  }
  getDropdownMenuAriaOptions() {
    const { search, multiple } = this.props
    const ariaOptions = {}
    if (search) {
      ariaOptions['aria-multiselectable'] = multiple
      ariaOptions.role = 'listbox'
    }
    return ariaOptions
  }
  clearSearchQuery = () => {
    debug('clearSearchQuery()')
    const { searchQuery } = this.state
    if (searchQuery === undefined || searchQuery === '') return
    this.setState({ searchQuery: '' })
  }
  handleLabelClick = (e, labelProps) => {
    debug('handleLabelClick()')
    // prevent focusing search input on click
    e.stopPropagation()
    this.setState({ selectedLabel: labelProps.value })
    _.invoke(this.props, 'onLabelClick', e, labelProps)
  }
  handleLabelRemove = (e, labelProps) => {
    debug('handleLabelRemove()')
    e.stopPropagation()
    const { value } = this.state
    const newValue = _.without(value, labelProps.value)
    debug('label props:', labelProps)
    debug('current value:', value)
    debug('remove value:', labelProps.value)
    debug('new value:', newValue)
    this.setState({ value: newValue })
    this.handleChange(e, newValue)
  }
  getSelectedIndexAfterMove = (offset, startIndex = this.state.selectedIndex) => {
    debug('moveSelectionBy()')
    debug(`offset: ${offset}`)
    const options = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,
      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    })
    if (options === undefined || _.every(options, 'disabled')) return
    const lastIndex = options.length - 1
    const { wrapSelection } = this.props
    let nextIndex = startIndex + offset
    if (!wrapSelection && (nextIndex > lastIndex || nextIndex < 0)) {
      nextIndex = startIndex
    } else if (nextIndex > lastIndex) {
      nextIndex = 0
    } else if (nextIndex < 0) {
      nextIndex = lastIndex
    }
    if (options[nextIndex].disabled) {
      return this.getSelectedIndexAfterMove(offset, nextIndex)
    }
    return nextIndex
  }
  handleIconOverrides = (predefinedProps) => {
    const { clearable } = this.props
    const classes = cx(clearable && this.hasValue() && 'clear', predefinedProps.className)
    return {
      className: classes,
      onClick: (e) => {
        _.invoke(predefinedProps, 'onClick', e, predefinedProps)
        this.handleIconClick(e)
      },
    }
  }
  clearValue = (e) => {
    const { multiple } = this.props
    const newValue = multiple ? [] : ''
    this.setState({ value: newValue })
    this.handleChange(e, newValue)
  }
  computeSearchInputTabIndex = () => {
    const { disabled, tabIndex } = this.props
    if (!_.isNil(tabIndex)) return tabIndex
    return disabled ? -1 : 0
  }
  computeSearchInputWidth = () => {
    const { searchQuery } = this.state
    if (this.sizerRef.current && searchQuery) {
      // resize the search input, temporarily show the sizer so we can measure it
      this.sizerRef.current.style.display = 'inline'
      this.sizerRef.current.textContent = searchQuery
      const searchWidth = Math.ceil(this.sizerRef.current.getBoundingClientRect().width)
      this.sizerRef.current.style.removeProperty('display')
      return searchWidth
    }
  }
  computeTabIndex = () => {
    const { disabled, search, tabIndex } = this.props
    if (search) return undefined
    if (disabled) return -1
    return _.isNil(tabIndex) ? 0 : tabIndex
  }
  handleSearchInputOverrides = (predefinedProps) => ({
    onChange: (e, inputProps) => {
      _.invoke(predefinedProps, 'onChange', e, inputProps)
      this.handleSearchChange(e, inputProps)
    },
    ref: this.searchRef,
  })
  hasValue = () => {
    const { multiple } = this.props
    const { value } = this.state
    return multiple ? !_.isEmpty(value) : !_.isNil(value) && value !== ''
  }
  // ----------------------------------------
  // Behavior
  // ----------------------------------------
  scrollSelectedItemIntoView = () => {
    debug('scrollSelectedItemIntoView()')
    if (!this.ref.current) return
    const menu = this.ref.current.querySelector('.menu.visible')
    if (!menu) return
    const item = menu.querySelector('.item.selected')
    if (!item) return
    debug(`menu: ${menu}`)
    debug(`item: ${item}`)
    const isOutOfUpperView = item.offsetTop < menu.scrollTop
    const isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight
    if (isOutOfUpperView) {
      menu.scrollTop = item.offsetTop
    } else if (isOutOfLowerView) {
      menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight
    }
  }
  setOpenDirection = () => {
    if (!this.ref.current) return
    const menu = this.ref.current.querySelector('.menu.visible')
    if (!menu) return
    const dropdownRect = this.ref.current.getBoundingClientRect()
    const menuHeight = menu.clientHeight
    const spaceAtTheBottom =
      document.documentElement.clientHeight - dropdownRect.top - dropdownRect.height - menuHeight
    const spaceAtTheTop = dropdownRect.top - menuHeight
    const upward = spaceAtTheBottom < 0 && spaceAtTheTop > spaceAtTheBottom
    if (!upward !== !this.state.upward) {
      this.setState({ upward })
    }
  }
  open = (e = null, triggerSetState = true) => {
    const { disabled, search } = this.props
    debug('open()', { disabled, search, open: this.state.open })
    if (disabled) return
    if (search) _.invoke(this.searchRef.current, 'focus')
    _.invoke(this.props, 'onOpen', e, this.props)
    if (triggerSetState) {
      this.setState({ open: true })
    }
    this.scrollSelectedItemIntoView()
  }
  close = (e, callback = this.handleClose) => {
    debug('close()', { open: this.state.open })
    if (this.state.open) {
      _.invoke(this.props, 'onClose', e, this.props)
      this.setState({ open: false }, callback)
    }
  }
  handleClose = () => {
    debug('handleClose()')
    const hasSearchFocus = document.activeElement === this.searchRef.current
    if (!hasSearchFocus && this.ref.current) {
      this.ref.current.blur()
    }
    const hasDropdownFocus = document.activeElement === this.ref.current
    const hasFocus = hasSearchFocus || hasDropdownFocus
    this.setState({ focus: hasFocus })
  }
  toggle = (e) => (this.state.open ? this.close(e) : this.open(e))
  renderText = () => {
    const { multiple, placeholder, search, text } = this.props
    const { searchQuery, selectedIndex, value, open } = this.state
    const hasValue = this.hasValue()
    const classes = cx(
      placeholder && !hasValue && 'default',
      'text',
      search && searchQuery && 'filtered',
    )
    let _text = placeholder
    let selectedItem
    if (text) {
      _text = text
    } else if (open && !multiple) {
      selectedItem = this.getSelectedItem(selectedIndex)
    } else if (hasValue) {
      selectedItem = this.getItemByValue(value)
    }
    return DropdownText.create(selectedItem ? renderItemContent(selectedItem) : _text, {
      defaultProps: {
        className: classes,
      },
    })
  }
  renderSearchInput = () => {
    const { search, searchInput } = this.props
    const { searchQuery } = this.state
    return (
      search &&
      DropdownSearchInput.create(searchInput, {
        defaultProps: {
          style: { width: this.computeSearchInputWidth() },
          tabIndex: this.computeSearchInputTabIndex(),
          value: searchQuery,
        },
        overrideProps: this.handleSearchInputOverrides,
      })
    )
  }
  renderSearchSizer = () => {
    const { search, multiple } = this.props
    return search && multiple && <span className='sizer' ref={this.sizerRef} />
  }
  renderLabels = () => {
    debug('renderLabels()')
    const { multiple, renderLabel } = this.props
    const { selectedLabel, value } = this.state
    if (!multiple || _.isEmpty(value)) {
      return
    }
    const selectedItems = _.map(value, this.getItemByValue)
    debug('selectedItems', selectedItems)
    return _.map(_.compact(selectedItems), (item, index) => {
      const defaultProps = {
        active: item.value === selectedLabel,
        as: 'a',
        key: getKeyOrValue(item.key, item.value),
        onClick: this.handleLabelClick,
        onRemove: this.handleLabelRemove,
        value: item.value,
      }
      return Label.create(renderLabel(item, index, defaultProps), { defaultProps })
    })
  }
  renderOptions = () => {
    const { lazyLoad, multiple, search, noResultsMessage } = this.props
    const { open, selectedIndex, value } = this.state
    if (lazyLoad && !open) return null
    const options = getMenuOptions({
      value: this.state.value,
      options: this.props.options,
      searchQuery: this.state.searchQuery,
      additionLabel: this.props.additionLabel,
      additionPosition: this.props.additionPosition,
      allowAdditions: this.props.allowAdditions,
      deburr: this.props.deburr,
      multiple: this.props.multiple,
      search: this.props.search,
    })
    if (noResultsMessage !== null && search && _.isEmpty(options)) {
      return <div className='message'>{noResultsMessage}</div>
    }
    const isActive = multiple
      ? (optValue) => _.includes(value, optValue)
      : (optValue) => optValue === value
    return _.map(options, (opt, i) =>
      DropdownItem.create(
        {
          active: isActive(opt.value),
          selected: selectedIndex === i,
          ...opt,
          key: getKeyOrValue(opt.key, opt.value),
          style: { ...opt.style, pointerEvents: 'all' },
        },
        {
          generateKey: false,
          overrideProps: (predefinedProps) => ({
            onClick: (e, item) => {
              predefinedProps.onClick?.(e, item)
              this.handleItemClick(e, item)
            },
          }),
        },
      ),
    )
  }
  renderMenu = () => {
    const { children, direction, header } = this.props
    const { open } = this.state
    const ariaOptions = this.getDropdownMenuAriaOptions()
    if (!childrenUtils.isNil(children)) {
      const menuChild = Children.only(children)
      const className = cx(direction, getKeyOnly(open, 'visible'), menuChild.props.className)
      return cloneElement(menuChild, { className, ...ariaOptions })
    }
    return (
      <DropdownMenu {...ariaOptions} direction={direction} open={open}>
        {DropdownHeader.create(header, { autoGenerateKey: false })}
        {this.renderOptions()}
      </DropdownMenu>
    )
  }
  render() {
    debug('render()')
    debug('props', this.props)
    debug('state', this.state)
    const {
      basic,
      button,
      className,
      compact,
      disabled,
      error,
      fluid,
      floating,
      icon,
      inline,
      item,
      labeled,
      loading,
      multiple,
      pointing,
      search,
      selection,
      scrolling,
      simple,
      trigger,
    } = this.props
    const { focus, open, upward } = this.state
    const classes = cx(
      'ui',
      getKeyOnly(open, 'active visible'),
      getKeyOnly(disabled, 'disabled'),
      getKeyOnly(error, 'error'),
      getKeyOnly(loading, 'loading'),
      getKeyOnly(basic, 'basic'),
      getKeyOnly(button, 'button'),
      getKeyOnly(compact, 'compact'),
      getKeyOnly(fluid, 'fluid'),
      getKeyOnly(floating, 'floating'),
      getKeyOnly(inline, 'inline'),
      getKeyOnly(labeled, 'labeled'),
      getKeyOnly(item, 'item'),
      getKeyOnly(multiple, 'multiple'),
      getKeyOnly(search, 'search'),
      getKeyOnly(selection, 'selection'),
      getKeyOnly(simple, 'simple'),
      getKeyOnly(scrolling, 'scrolling'),
      getKeyOnly(upward, 'upward'),
      getKeyOrValueAndKey(pointing, 'pointing'),
      'dropdown',
      className,
    )
    const rest = getUnhandledProps(Dropdown, this.props)
    const ElementType = getComponentType(this.props)
    const ariaOptions = this.getDropdownAriaOptions(ElementType, this.props)
    return (
      <ElementType
        {...rest}
        {...ariaOptions}
        className={classes}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onMouseDown={this.handleMouseDown}
        onFocus={this.handleFocus}
        onChange={this.handleChange}
        tabIndex={this.computeTabIndex()}
        ref={this.handleRef}
      >
        {this.renderLabels()}
        {this.renderSearchInput()}
        {this.renderSearchSizer()}
        {trigger || this.renderText()}
        {Icon.create(icon, {
          overrideProps: this.handleIconOverrides,
          autoGenerateKey: false,
        })}
        {this.renderMenu()}
        {open && <EventStack name='keydown' on={this.closeOnEscape} />}
        {open && <EventStack name='click' on={this.closeOnDocumentClick} />}
        {focus && <EventStack name='keydown' on={this.removeItemOnBackspace} />}
      </ElementType>
    )
  }
}
Dropdown.propTypes = {
  as: PropTypes.elementType,
  additionLabel: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  additionPosition: PropTypes.oneOf(['top', 'bottom']),
  allowAdditions: customPropTypes.every([
    customPropTypes.demand(['options', 'selection', 'search']),
    PropTypes.bool,
  ]),
  basic: PropTypes.bool,
  button: PropTypes.bool,
  children: customPropTypes.every([
    customPropTypes.disallow(['options', 'selection']),
    customPropTypes.givenProps(
      { children: PropTypes.any.isRequired },
      PropTypes.element.isRequired,
    ),
  ]),
  className: PropTypes.string,
  clearable: PropTypes.bool,
  closeOnBlur: PropTypes.bool,
  closeOnEscape: PropTypes.bool,
  closeOnChange: PropTypes.bool,
  compact: PropTypes.bool,
  deburr: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  defaultSearchQuery: PropTypes.string,
  defaultSelectedLabel: customPropTypes.every([
    customPropTypes.demand(['multiple']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),
  defaultUpward: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  ]),
  direction: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  floating: PropTypes.bool,
  fluid: PropTypes.bool,
  header: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  inline: PropTypes.bool,
  item: PropTypes.bool,
  labeled: PropTypes.bool,
  lazyLoad: PropTypes.bool,
  loading: PropTypes.bool,
  minCharacters: PropTypes.number,
  multiple: PropTypes.bool,
  noResultsMessage: PropTypes.node,
  onAddItem: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onFocus: PropTypes.func,
  onLabelClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onOpen: PropTypes.func,
  onSearchChange: PropTypes.func,
  open: PropTypes.bool,
  openOnFocus: PropTypes.bool,
  options: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.arrayOf(PropTypes.shape(DropdownItem.propTypes)),
  ]),
  placeholder: PropTypes.string,
  pointing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([
      'left',
      'right',
      'top',
      'top left',
      'top right',
      'bottom',
      'bottom left',
      'bottom right',
    ]),
  ]),
  renderLabel: PropTypes.func,
  scrolling: PropTypes.bool,
  search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  searchInput: PropTypes.oneOfType([PropTypes.array, PropTypes.node, PropTypes.object]),
  searchQuery: PropTypes.string,
  selectOnBlur: PropTypes.bool,
  selectOnNavigation: PropTypes.bool,
  selectedLabel: customPropTypes.every([
    customPropTypes.demand(['multiple']),
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ]),
  selection: customPropTypes.every([
    customPropTypes.disallow(['children']),
    customPropTypes.demand(['options']),
    PropTypes.bool,
  ]),
  simple: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text: PropTypes.string,
  trigger: customPropTypes.every([customPropTypes.disallow(['selection', 'text']), PropTypes.node]),
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number])),
  ]),
  upward: PropTypes.bool,
  wrapSelection: PropTypes.bool,
}
Dropdown.displayName = 'Dropdown'
DropdownInner.autoControlledProps = ['open', 'searchQuery', 'selectedLabel', 'value', 'upward']
if (process.env.NODE_ENV !== 'production') {
  DropdownInner.propTypes = Dropdown.propTypes
}
Dropdown.Divider = DropdownDivider
Dropdown.Header = DropdownHeader
Dropdown.Item = DropdownItem
Dropdown.Menu = DropdownMenu
Dropdown.SearchInput = DropdownSearchInput
Dropdown.Text = DropdownText
export default Dropdown
````

## File: modules/Dropdown/DropdownDivider.d.ts/DropdownDivider.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export interface DropdownDividerProps extends StrictDropdownDividerProps {
  [key: string]: any
}
export interface StrictDropdownDividerProps {
  as?: any
  className?: string
}
declare const DropdownDivider: ForwardRefComponent<DropdownDividerProps, HTMLDivElement>
export default DropdownDivider
````

## File: modules/Dropdown/DropdownDivider.js/DropdownDivider.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps } from '../../lib'
const DropdownDivider = React.forwardRef(function (props, ref) {
  const { className } = props
  const classes = cx('divider', className)
  const rest = getUnhandledProps(DropdownDivider, props)
  const ElementType = getComponentType(props)
  return <ElementType {...rest} className={classes} ref={ref} />
})
DropdownDivider.displayName = 'DropdownDivider'
DropdownDivider.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
}
export default DropdownDivider
````

## File: modules/Dropdown/DropdownHeader.d.ts/DropdownHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface DropdownHeaderProps extends StrictDropdownHeaderProps {
  [key: string]: any
}
export interface StrictDropdownHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  icon?: SemanticShorthandItem<IconProps>
}
declare const DropdownHeader: ForwardRefComponent<DropdownHeaderProps, HTMLDivElement>
export default DropdownHeader
````

## File: modules/Dropdown/DropdownHeader.js/DropdownHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import Icon from '../../elements/Icon'
const DropdownHeader = React.forwardRef(function (props, ref) {
  const { children, className, content, icon } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(DropdownHeader, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content}
    </ElementType>
  )
})
DropdownHeader.displayName = 'DropdownHeader'
DropdownHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  icon: customPropTypes.itemShorthand,
}
DropdownHeader.create = createShorthandFactory(DropdownHeader, (content) => ({ content }))
export default DropdownHeader
````

## File: modules/Dropdown/DropdownItem.d.ts/DropdownItem.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  HtmlSpanProps,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { FlagProps } from '../../elements/Flag'
import { IconProps } from '../../elements/Icon'
import { ImageProps } from '../../elements/Image'
import { LabelProps } from '../../elements/Label'
export interface DropdownItemProps extends StrictDropdownItemProps {
  [key: string]: any
}
export interface StrictDropdownItemProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<HtmlSpanProps>
  disabled?: boolean
  flag?: SemanticShorthandItem<FlagProps>
  icon?: SemanticShorthandItem<IconProps>
  image?: SemanticShorthandItem<ImageProps>
  label?: SemanticShorthandItem<LabelProps>
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: DropdownItemProps) => void
  selected?: boolean
  text?: SemanticShorthandContent
  value?: boolean | number | string
}
declare const DropdownItem: ForwardRefComponent<DropdownItemProps, HTMLDivElement>
export default DropdownItem
````

## File: modules/Dropdown/DropdownItem.js/DropdownItem.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthand,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import Flag from '../../elements/Flag'
import Icon from '../../elements/Icon'
import Image from '../../elements/Image'
import Label from '../../elements/Label'
const DropdownItem = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    disabled,
    description,
    flag,
    icon,
    image,
    label,
    selected,
    text,
  } = props
  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, props)
  }
  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(selected, 'selected'),
    'item',
    className,
  )
  const iconName = _.isNil(icon)
    ? childrenUtils.someByType(children, 'DropdownMenu') && 'dropdown'
    : icon
  const rest = getUnhandledProps(DropdownItem, props)
  const ElementType = getComponentType(props)
  const ariaOptions = {
    role: 'option',
    'aria-disabled': disabled,
    'aria-checked': active,
    'aria-selected': selected,
  }
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const flagElement = Flag.create(flag, { autoGenerateKey: false })
  const iconElement = Icon.create(iconName, { autoGenerateKey: false })
  const imageElement = Image.create(image, { autoGenerateKey: false })
  const labelElement = Label.create(label, { autoGenerateKey: false })
  const descriptionElement = createShorthand('span', (val) => ({ children: val }), description, {
    defaultProps: { className: 'description' },
    autoGenerateKey: false,
  })
  const textElement = createShorthand(
    'span',
    (val) => ({ children: val }),
    childrenUtils.isNil(content) ? text : content,
    { defaultProps: { className: 'text' }, autoGenerateKey: false },
  )
  return (
    <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick} ref={ref}>
      {imageElement}
      {iconElement}
      {flagElement}
      {labelElement}
      {descriptionElement}
      {textElement}
    </ElementType>
  )
})
DropdownItem.displayName = 'DropdownItem'
DropdownItem.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  disabled: PropTypes.bool,
  flag: customPropTypes.itemShorthand,
  icon: customPropTypes.itemShorthand,
  image: customPropTypes.itemShorthand,
  label: customPropTypes.itemShorthand,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  text: customPropTypes.contentShorthand,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
}
DropdownItem.create = createShorthandFactory(DropdownItem, (opts) => opts)
export default DropdownItem
````

## File: modules/Dropdown/DropdownMenu.d.ts/DropdownMenu.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface DropdownMenuProps extends StrictDropdownMenuProps {
  [key: string]: any
}
export interface StrictDropdownMenuProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  direction?: 'left' | 'right'
  open?: boolean
  scrolling?: boolean
}
declare const DropdownMenu: ForwardRefComponent<DropdownMenuProps, HTMLDivElement>
export default DropdownMenu
````

## File: modules/Dropdown/DropdownMenu.js/DropdownMenu.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const DropdownMenu = React.forwardRef(function (props, ref) {
  const { children, className, content, direction, open, scrolling } = props
  const classes = cx(
    direction,
    getKeyOnly(open, 'visible'),
    getKeyOnly(scrolling, 'scrolling'),
    'menu transition',
    className,
  )
  const rest = getUnhandledProps(DropdownMenu, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
DropdownMenu.displayName = 'DropdownMenu'
DropdownMenu.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  direction: PropTypes.oneOf(['left', 'right']),
  open: PropTypes.bool,
  scrolling: PropTypes.bool,
}
export default DropdownMenu
````

## File: modules/Dropdown/DropdownSearchInput.d.ts/DropdownSearchInput.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export interface DropdownSearchInputProps extends StrictDropdownSearchInputProps {
  [key: string]: any
}
export interface StrictDropdownSearchInputProps {
  as?: any
  autoComplete?: string
  className?: string
  tabIndex?: number | string
  type?: string
  value?: number | string
}
declare const DropdownSearchInput: ForwardRefComponent<DropdownSearchInputProps, HTMLInputElement>
export default DropdownSearchInput
````

## File: modules/Dropdown/DropdownSearchInput.js/DropdownSearchInput.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { createShorthandFactory, getComponentType, getUnhandledProps } from '../../lib'
const DropdownSearchInput = React.forwardRef(function (props, ref) {
  const { autoComplete = 'off', className, tabIndex, type = 'text', value } = props
  const handleChange = (e) => {
    const newValue = _.get(e, 'target.value')
    _.invoke(props, 'onChange', e, { ...props, value: newValue })
  }
  const classes = cx('search', className)
  const ElementType = getComponentType(props, { defaultAs: 'input' })
  const rest = getUnhandledProps(DropdownSearchInput, props)
  return (
    <ElementType
      aria-autocomplete='list'
      {...rest}
      autoComplete={autoComplete}
      className={classes}
      onChange={handleChange}
      ref={ref}
      tabIndex={tabIndex}
      type={type}
      value={value}
    />
  )
})
DropdownSearchInput.displayName = 'DropdownSearchInput'
DropdownSearchInput.propTypes = {
  as: PropTypes.elementType,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}
DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput, (type) => ({ type }))
export default DropdownSearchInput
````

## File: modules/Dropdown/DropdownText.d.ts/DropdownText.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface DropdownTextProps extends StrictDropdownTextProps {
  [key: string]: any
}
export interface StrictDropdownTextProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const DropdownText: ForwardRefComponent<DropdownTextProps, HTMLDivElement>
export default DropdownText
````

## File: modules/Dropdown/DropdownText.js/DropdownText.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const DropdownText = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('divider', className)
  const rest = getUnhandledProps(DropdownText, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType
      aria-atomic
      aria-live='polite'
      role='alert'
      {...rest}
      className={classes}
      ref={ref}
    >
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
DropdownText.displayName = 'DropdownText'
DropdownText.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
DropdownText.create = createShorthandFactory(DropdownText, (val) => ({ content: val }))
export default DropdownText
````

## File: modules/Dropdown/index.d.ts/index.d.ts
````typescript
export { default, DropdownProps, StrictDropdownProps, DropdownOnSearchChangeData } from './Dropdown'
````

## File: modules/Dropdown/index.js/index.js
````javascript
export default from './Dropdown'
````

## File: modules/Dropdown/TODO.md/TODO.md
````markdown
## Dropdown TODO 
Animations are not yet supported

Ideally we'd reuse CSS animations baked into Semantic UI.
This requires dynamic classNames on the dropdown and the menu as well as a dynamic style for the menu transition duration.
This state based implementation should be generalized using ReactTransitionGroup hooks (or similar) and used for all components.

```jsx
state = {
  dropdownAnimationClasses: '',
  menuAnimationClasses: 'hidden',
}

open = () => {
  if (this.state.isOpen) return
  // animation prep
  this.setState({
    isOpen: true,
    menuStyle: {
      animationDuration: '200ms',
      display: 'block !important',
    },
  })
  // animation start
  setTimeout(() => this.setState({
    dropdownAnimationClasses: 'active',
    menuAnimationClasses: 'visible animating slide down in',
  }), 0)
  // animation end
  setTimeout(() => this.setState({
    dropdownAnimationClasses: 'active visible',
    menuAnimationClasses: 'visible',
    menuStyle: {
      animationDuration: null,
    },
  }), 200)
}

close = () => {
  if (!this.state.isOpen) return
  // animation prep
  this.setState({
    isOpen: false,
    menuStyle: {
      animationDuration: '200ms',
    },
  })
  // animation start
  setTimeout(() => this.setState({
    dropdownAnimationClasses: 'visible',
    menuAnimationClasses: 'visible animating slide down out',
  }), 0)
  // animation end
  setTimeout(() => this.setState({
    dropdownAnimationClasses: '',
    menuAnimationClasses: 'hidden',
    menuStyle: {
      display: null,
      animationDuration: null,
    },
  }), 200)
```
````

## File: modules/Dropdown/utils/getMenuOptions.js/getMenuOptions.js
````javascript
import _ from 'lodash'
import * as React from 'react'
export default function getMenuOptions(config) {
  const {
    additionLabel,
    additionPosition,
    allowAdditions,
    deburr,
    multiple,
    options,
    search,
    searchQuery,
    value,
  } = config
  let filteredOptions = options
  if (multiple) {
    filteredOptions = _.filter(filteredOptions, (opt) => !_.includes(value, opt.value))
  }
  if (search && searchQuery) {
    if (_.isFunction(search)) {
      filteredOptions = search(filteredOptions, searchQuery)
    } else {
      const strippedQuery = deburr ? _.deburr(searchQuery) : searchQuery
      const re = new RegExp(_.escapeRegExp(strippedQuery), 'i')
      filteredOptions = _.filter(filteredOptions, (opt) =>
        re.test(deburr ? _.deburr(opt.text) : opt.text),
      )
    }
  }
  if (allowAdditions && search && searchQuery && !_.some(filteredOptions, { text: searchQuery })) {
    const additionLabelElement = React.isValidElement(additionLabel)
      ? React.cloneElement(additionLabel, { key: 'addition-label' })
      : additionLabel || ''
    const addItem = {
      key: 'addition',
      text: [additionLabelElement, <b key='addition-query'>{searchQuery}</b>],
      value: searchQuery,
      className: 'addition',
      'data-additional': true,
    }
    if (additionPosition === 'top') filteredOptions.unshift(addItem)
    else filteredOptions.push(addItem)
  }
  return filteredOptions
}
````

## File: modules/Dropdown/utils/getSelectedIndex.js/getSelectedIndex.js
````javascript
import _ from 'lodash'
import getMenuOptions from './getMenuOptions'
export default function getSelectedIndex(config) {
  const {
    additionLabel,
    additionPosition,
    allowAdditions,
    deburr,
    multiple,
    options,
    search,
    searchQuery,
    selectedIndex,
    value,
  } = config
  const menuOptions = getMenuOptions({
    value,
    options,
    searchQuery,
    additionLabel,
    additionPosition,
    allowAdditions,
    deburr,
    multiple,
    search,
  })
  const enabledIndexes = _.reduce(
    menuOptions,
    (memo, item, index) => {
      if (!item.disabled) memo.push(index)
      return memo
    },
    [],
  )
  let newSelectedIndex
  if (!selectedIndex || selectedIndex < 0) {
    const firstIndex = enabledIndexes[0]
    newSelectedIndex = multiple
      ? firstIndex
      : _.findIndex(menuOptions, ['value', value]) || enabledIndexes[0]
  } else if (multiple) {
    newSelectedIndex = _.find(enabledIndexes, (index) => index >= selectedIndex)
    if (selectedIndex >= menuOptions.length - 1) {
      newSelectedIndex = enabledIndexes[enabledIndexes.length - 1]
    }
  } else {
    const activeIndex = _.findIndex(menuOptions, ['value', value])
    newSelectedIndex = _.includes(enabledIndexes, activeIndex) ? activeIndex : undefined
  }
  if (!newSelectedIndex || newSelectedIndex < 0) {
    newSelectedIndex = enabledIndexes[0]
  }
  return newSelectedIndex
}
````

## File: modules/Embed/Embed.d.ts/Embed.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  HtmlIframeProps,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface EmbedProps extends StrictEmbedProps {
  [key: string]: any
}
export interface StrictEmbedProps {
  as?: any
  active?: boolean
  aspectRatio?: '4:3' | '16:9' | '21:9'
  autoplay?: boolean
  brandedUI?: boolean
  children?: React.ReactNode
  className?: string
  color?: string
  content?: SemanticShorthandContent
  defaultActive?: boolean
  hd?: boolean
  icon?: SemanticShorthandItem<IconProps>
  id?: string
  iframe?: SemanticShorthandItem<HtmlIframeProps>
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: EmbedProps) => void
  placeholder?: string
  source?: 'youtube' | 'vimeo'
  url?: string
}
declare const Embed: ForwardRefComponent<EmbedProps, HTMLDivElement>
export default Embed
````

## File: modules/Embed/Embed.js/Embed.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createHTMLIframe,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  useAutoControlledValue,
} from '../../lib'
import Icon from '../../elements/Icon'
const Embed = React.forwardRef(function (props, ref) {
  const {
    aspectRatio,
    autoplay = true,
    brandedUI = false,
    children,
    className,
    color = '#444444',
    content,
    hd = true,
    icon,
    id,
    iframe,
    placeholder,
    source,
    url,
  } = props
  const [active, setActive] = useAutoControlledValue({
    state: props.active,
    defaultState: props.defaultActive,
    initialState: false,
  })
  const getSrc = () => {
    if (source === 'youtube') {
      return [
        `//www.youtube.com/embed/${id}`,
        '?autohide=true',
        `&amp;autoplay=${autoplay}`,
        `&amp;color=${encodeURIComponent(color)}`,
        `&amp;hq=${hd}`,
        '&amp;jsapi=false',
        `&amp;modestbranding=${brandedUI}`,
        `&amp;rel=${brandedUI ? 0 : 1}`,
      ].join('')
    }
    if (source === 'vimeo') {
      return [
        `//player.vimeo.com/video/${id}`,
        '?api=false',
        `&amp;autoplay=${autoplay}`,
        '&amp;byline=false',
        `&amp;color=${encodeURIComponent(color)}`,
        '&amp;portrait=false',
        '&amp;title=false',
      ].join('')
    }
    return url
  }
  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, { ...props, active: true })
    if (!active) {
      setActive(true)
    }
  }
  const renderEmbed = () => {
    if (!active) {
      return null
    }
    if (!childrenUtils.isNil(children)) {
      return <div className='embed'>{children}</div>
    }
    if (!childrenUtils.isNil(content)) {
      return <div className='embed'>{content}</div>
    }
    return (
      <div className='embed'>
        {createHTMLIframe(childrenUtils.isNil(iframe) ? getSrc() : iframe, {
          defaultProps: {
            allowFullScreen: false,
            frameBorder: 0,
            height: '100%',
            scrolling: 'no',
            src: getSrc(),
            title: `Embedded content from ${source}.`,
            width: '100%',
          },
          autoGenerateKey: false,
        })}
      </div>
    )
  }
  const classes = cx('ui', aspectRatio, getKeyOnly(active, 'active'), 'embed', className)
  const rest = getUnhandledProps(Embed, props)
  const ElementType = getComponentType(props)
  const iconShorthand = icon !== undefined ? icon : 'video play'
  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
      {Icon.create(iconShorthand, { autoGenerateKey: false })}
      {placeholder && <img className='placeholder' src={placeholder} />}
      {renderEmbed()}
    </ElementType>
  )
})
Embed.displayName = 'Embed'
Embed.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  aspectRatio: PropTypes.oneOf(['4:3', '16:9', '21:9']),
  autoplay: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),
  brandedUI: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),
  children: PropTypes.node,
  className: PropTypes.string,
  color: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),
  content: customPropTypes.contentShorthand,
  defaultActive: PropTypes.bool,
  hd: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.bool]),
  icon: customPropTypes.itemShorthand,
  id: customPropTypes.every([customPropTypes.demand(['source']), PropTypes.string]),
  iframe: customPropTypes.every([
    customPropTypes.demand(['source']),
    customPropTypes.itemShorthand,
  ]),
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  source: customPropTypes.every([
    customPropTypes.disallow(['sourceUrl']),
    PropTypes.oneOf(['youtube', 'vimeo']),
  ]),
  url: customPropTypes.every([customPropTypes.disallow(['source']), PropTypes.string]),
}
export default Embed
````

## File: modules/Embed/index.d.ts/index.d.ts
````typescript
export { default, EmbedProps, StrictEmbedProps } from './Embed'
````

## File: modules/Embed/index.js/index.js
````javascript
export default from './Embed'
````

## File: modules/Modal/index.d.ts/index.d.ts
````typescript
export { default, ModalProps, StrictModalProps } from './Modal'
````

## File: modules/Modal/index.js/index.js
````javascript
export default from './Modal'
````

## File: modules/Modal/Modal.d.ts/Modal.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { StrictPortalProps } from '../../addons/Portal'
import ModalActions, { ModalActionsProps } from './ModalActions'
import ModalContent, { ModalContentProps } from './ModalContent'
import ModalDescription from './ModalDescription'
import ModalDimmer, { ModalDimmerProps } from './ModalDimmer'
import ModalHeader, { ModalHeaderProps } from './ModalHeader'
export interface ModalProps extends StrictModalProps {
  [key: string]: any
}
export interface StrictModalProps extends StrictPortalProps {
  as?: any
  actions?: SemanticShorthandItem<ModalActionsProps>
  basic?: boolean
  centered?: boolean
  children?: React.ReactNode
  className?: string
  closeIcon?: any
  closeOnDimmerClick?: boolean
  closeOnDocumentClick?: boolean
  content?: SemanticShorthandItem<ModalContentProps>
  defaultOpen?: boolean
  dimmer?: true | 'blurring' | 'inverted' | SemanticShorthandItem<ModalDimmerProps>
  eventPool?: string
  header?: SemanticShorthandItem<ModalHeaderProps>
  mountNode?: any
  onActionClick?: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void
  onClose?: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void
  onMount?: (nothing: null, data: ModalProps) => void
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: ModalProps) => void
  onUnmount?: (nothing: null, data: ModalProps) => void
  open?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'
  style?: React.CSSProperties
  trigger?: React.ReactNode
}
declare const Modal: ForwardRefComponent<ModalProps, HTMLDivElement> & {
  Actions: typeof ModalActions
  Content: typeof ModalContent
  Description: typeof ModalDescription
  Dimmer: typeof ModalDimmer
  Header: typeof ModalHeader
}
export default Modal
````

## File: modules/Modal/Modal.js/Modal.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import shallowEqual from 'shallowequal'
import {
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  eventStack,
  getComponentType,
  getUnhandledProps,
  isBrowser,
  makeDebugger,
  getKeyOnly,
  useAutoControlledValue,
  useMergedRefs,
} from '../../lib'
import Icon from '../../elements/Icon'
import Portal from '../../addons/Portal'
import ModalActions from './ModalActions'
import ModalContent from './ModalContent'
import ModalDescription from './ModalDescription'
import ModalDimmer from './ModalDimmer'
import ModalHeader from './ModalHeader'
import { canFit, getLegacyStyles, isLegacy } from './utils'
const debug = makeDebugger('modal')
const Modal = React.forwardRef(function (props, ref) {
  const {
    actions,
    basic,
    centered = true,
    children,
    className,
    closeIcon,
    closeOnDimmerClick = true,
    closeOnDocumentClick = false,
    content,
    dimmer = true,
    eventPool = 'Modal',
    header,
    size,
    style,
    trigger,
  } = props
  const mountNode = isBrowser() ? props.mountNode || document.body : null
  const [open, setOpen] = useAutoControlledValue({
    state: props.open,
    defaultState: props.defaultOpen,
    initialState: false,
  })
  const [legacyStyles, setLegacyStyles] = React.useState({})
  const [scrolling, setScrolling] = React.useState(false)
  const [legacy] = React.useState(() => isBrowser() && isLegacy())
  const elementRef = useMergedRefs(ref, React.useRef())
  const dimmerRef = React.useRef()
  const animationRequestId = React.useRef()
  const latestDocumentMouseDownEvent = React.useRef()
  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRequestId.current)
      latestDocumentMouseDownEvent.current = null
    }
  }, [])
  const setPositionAndClassNames = () => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const isFitted = canFit(rect)
      setScrolling(!isFitted)
      const computedLegacyStyles = legacy ? getLegacyStyles(isFitted, centered, rect) : {}
      if (!shallowEqual(computedLegacyStyles, computedLegacyStyles)) {
        setLegacyStyles(computedLegacyStyles)
      }
    }
    animationRequestId.current = requestAnimationFrame(setPositionAndClassNames)
  }
  const handleClose = (e) => {
    debug('close()')
    setOpen(false)
    _.invoke(props, 'onClose', e, { ...props, open: false })
  }
  const handleDocumentMouseDown = (e) => {
    latestDocumentMouseDownEvent.current = e
  }
  const handleDocumentClick = (e) => {
    debug('handleDocumentClick()')
    const currentDocumentMouseDownEvent = latestDocumentMouseDownEvent.current
    latestDocumentMouseDownEvent.current = null
    if (
      !closeOnDimmerClick ||
      doesNodeContainClick(elementRef.current, currentDocumentMouseDownEvent) ||
      doesNodeContainClick(elementRef.current, e)
    )
      return
    setOpen(false)
    _.invoke(props, 'onClose', e, { ...props, open: false })
  }
  const handleOpen = (e) => {
    debug('open()')
    setOpen(true)
    _.invoke(props, 'onOpen', e, { ...props, open: true })
  }
  const handlePortalMount = (e) => {
    debug('handlePortalMount()', { eventPool })
    setScrolling(false)
    setPositionAndClassNames()
    eventStack.sub('mousedown', handleDocumentMouseDown, {
      pool: eventPool,
      target: dimmerRef.current,
    })
    eventStack.sub('click', handleDocumentClick, {
      pool: eventPool,
      target: dimmerRef.current,
    })
    _.invoke(props, 'onMount', e, props)
  }
  const handlePortalUnmount = (e) => {
    debug('handlePortalUnmount()', { eventPool })
    cancelAnimationFrame(animationRequestId.current)
    eventStack.unsub('mousedown', handleDocumentMouseDown, {
      pool: eventPool,
      target: dimmerRef.current,
    })
    eventStack.unsub('click', handleDocumentClick, {
      pool: eventPool,
      target: dimmerRef.current,
    })
    _.invoke(props, 'onUnmount', e, props)
  }
  const renderContent = (rest) => {
    const classes = cx(
      'ui',
      size,
      getKeyOnly(basic, 'basic'),
      getKeyOnly(legacy, 'legacy'),
      getKeyOnly(scrolling, 'scrolling'),
      'modal transition visible active',
      className,
    )
    const ElementType = getComponentType(props)
    const closeIconName = closeIcon === true ? 'close' : closeIcon
    const closeIconJSX = Icon.create(closeIconName, {
      overrideProps: (predefinedProps) => ({
        onClick: (e) => {
          _.invoke(predefinedProps, 'onClick', e)
          handleClose(e)
        },
      }),
    })
    return (
      <ElementType
        {...rest}
        className={classes}
        ref={elementRef}
        style={{ ...legacyStyles, ...style }}
      >
        {closeIconJSX}
        {childrenUtils.isNil(children) ? (
          <>
            {ModalHeader.create(header, { autoGenerateKey: false })}
            {ModalContent.create(content, { autoGenerateKey: false })}
            {ModalActions.create(actions, {
              overrideProps: (predefinedProps) => ({
                onActionClick: (e, actionProps) => {
                  _.invoke(predefinedProps, 'onActionClick', e, actionProps)
                  _.invoke(props, 'onActionClick', e, props)
                  handleClose(e)
                },
              }),
            })}
          </>
        ) : (
          children
        )}
      </ElementType>
    )
  }
  if (!isBrowser()) {
    return React.isValidElement(trigger) ? trigger : null
  }
  const unhandled = getUnhandledProps(Modal, props)
  const portalPropNames = Portal.handledProps
  const rest = _.reduce(
    unhandled,
    (acc, val, key) => {
      if (!_.includes(portalPropNames, key)) acc[key] = val
      return acc
    },
    {},
  )
  const portalProps = _.pick(unhandled, portalPropNames)
  return (
    <Portal
      closeOnDocumentClick={closeOnDocumentClick}
      {...portalProps}
      trigger={trigger}
      eventPool={eventPool}
      mountNode={mountNode}
      open={open}
      onClose={handleClose}
      onMount={handlePortalMount}
      onOpen={handleOpen}
      onUnmount={handlePortalUnmount}
    >
      {ModalDimmer.create(_.isPlainObject(dimmer) ? dimmer : {}, {
        autoGenerateKey: false,
        defaultProps: {
          blurring: dimmer === 'blurring',
          inverted: dimmer === 'inverted',
        },
        overrideProps: {
          children: renderContent(rest),
          centered,
          mountNode,
          scrolling,
          ref: dimmerRef,
        },
      })}
    </Portal>
  )
})
Modal.displayName = 'Modal'
Modal.propTypes = {
  as: PropTypes.elementType,
  actions: customPropTypes.itemShorthand,
  basic: PropTypes.bool,
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  closeIcon: PropTypes.oneOfType([PropTypes.node, PropTypes.object, PropTypes.bool]),
  closeOnDimmerClick: PropTypes.bool,
  closeOnDocumentClick: PropTypes.bool,
  content: customPropTypes.itemShorthand,
  defaultOpen: PropTypes.bool,
  dimmer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
    PropTypes.object,
    PropTypes.oneOf(['inverted', 'blurring']),
  ]),
  eventPool: PropTypes.string,
  header: customPropTypes.itemShorthand,
  mountNode: PropTypes.any,
  onActionClick: PropTypes.func,
  onClose: PropTypes.func,
  onMount: PropTypes.func,
  onOpen: PropTypes.func,
  onUnmount: PropTypes.func,
  open: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
  style: PropTypes.object,
  trigger: PropTypes.node,
}
Modal.Actions = ModalActions
Modal.Content = ModalContent
Modal.Description = ModalDescription
Modal.Dimmer = ModalDimmer
Modal.Header = ModalHeader
export default Modal
````

## File: modules/Modal/ModalActions.d.ts/ModalActions.d.ts
````typescript
import * as React from 'react'
import { ButtonProps } from '../../elements/Button'
import {
  ForwardRefComponent,
  SemanticShorthandCollection,
  SemanticShorthandContent,
} from '../../generic'
export interface ModalActionsProps extends StrictModalActionsProps {
  [key: string]: any
}
export interface StrictModalActionsProps {
  as?: any
  actions?: SemanticShorthandCollection<ButtonProps>
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  onActionClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: ButtonProps) => void
}
declare const ModalActions: ForwardRefComponent<ModalActionsProps, HTMLDivElement>
export default ModalActions
````

## File: modules/Modal/ModalActions.js/ModalActions.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import Button from '../../elements/Button'
const ModalActions = React.forwardRef(function (props, ref) {
  const { actions, children, className, content } = props
  const classes = cx('actions', className)
  const rest = getUnhandledProps(ModalActions, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {_.map(actions, (action) =>
        Button.create(action, {
          overrideProps: (predefinedProps) => ({
            onClick: (e, buttonProps) => {
              _.invoke(predefinedProps, 'onClick', e, buttonProps)
              _.invoke(props, 'onActionClick', e, buttonProps)
            },
          }),
        }),
      )}
    </ElementType>
  )
})
ModalActions.displayName = 'ModalActions'
ModalActions.propTypes = {
  as: PropTypes.elementType,
  actions: customPropTypes.collectionShorthand,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  onActionClick: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.func]),
}
ModalActions.create = createShorthandFactory(ModalActions, (actions) => ({ actions }))
export default ModalActions
````

## File: modules/Modal/ModalContent.d.ts/ModalContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ModalContentProps extends StrictModalContentProps {
  [key: string]: any
}
export interface StrictModalContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  image?: boolean
  scrolling?: boolean
}
declare const ModalContent: ForwardRefComponent<ModalContentProps, HTMLDivElement>
export default ModalContent
````

## File: modules/Modal/ModalContent.js/ModalContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const ModalContent = React.forwardRef(function (props, ref) {
  const { children, className, content, image, scrolling } = props
  const classes = cx(
    className,
    getKeyOnly(image, 'image'),
    getKeyOnly(scrolling, 'scrolling'),
    'content',
  )
  const rest = getUnhandledProps(ModalContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ModalContent.displayName = 'ModalContent'
ModalContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  image: PropTypes.bool,
  scrolling: PropTypes.bool,
}
ModalContent.create = createShorthandFactory(ModalContent, (content) => ({ content }))
export default ModalContent
````

## File: modules/Modal/ModalDescription.d.ts/ModalDescription.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ModalDescriptionProps extends StrictModalDescriptionProps {
  [key: string]: any
}
export interface StrictModalDescriptionProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ModalDescription: ForwardRefComponent<ModalDescriptionProps, HTMLDivElement>
export default ModalDescription
````

## File: modules/Modal/ModalDescription.js/ModalDescription.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const ModalDescription = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('description', className)
  const rest = getUnhandledProps(ModalDescription, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ModalDescription.displayName = 'ModalDescription'
ModalDescription.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default ModalDescription
````

## File: modules/Modal/ModalDimmer.d.ts/ModalDimmer.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ModalDimmerProps extends StrictModalDimmerProps {
  [key: string]: any
}
export interface StrictModalDimmerProps {
  as?: any
  blurring?: boolean
  children?: React.ReactNode
  className?: string
  centered?: boolean
  content?: SemanticShorthandContent
  inverted?: boolean
  mountNode?: any
  scrolling?: boolean
}
declare const ModalDimmer: ForwardRefComponent<ModalDimmerProps, HTMLDivElement>
export default ModalDimmer
````

## File: modules/Modal/ModalDimmer.js/ModalDimmer.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  useClassNamesOnNode,
  getKeyOnly,
  useMergedRefs,
} from '../../lib'
const ModalDimmer = React.forwardRef(function (props, ref) {
  const { blurring, children, className, centered, content, inverted, mountNode, scrolling } = props
  const elementRef = useMergedRefs(ref, React.useRef())
  const classes = cx(
    'ui',
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(!centered, 'top aligned'),
    'page modals dimmer transition visible active',
    className,
  )
  const bodyClasses = cx(
    'dimmable dimmed',
    getKeyOnly(blurring, 'blurring'),
    getKeyOnly(scrolling, 'scrolling'),
  )
  const rest = getUnhandledProps(ModalDimmer, props)
  const ElementType = getComponentType(props)
  useClassNamesOnNode(mountNode, bodyClasses)
  React.useEffect(() => {
    elementRef.current?.style?.setProperty('display', 'flex', 'important')
  }, [])
  return (
    <ElementType {...rest} className={classes} ref={elementRef}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ModalDimmer.displayName = 'ModalDimmer'
ModalDimmer.propTypes = {
  as: PropTypes.elementType,
  blurring: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  centered: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  inverted: PropTypes.bool,
  mountNode: PropTypes.any,
  scrolling: PropTypes.bool,
}
ModalDimmer.create = createShorthandFactory(ModalDimmer, (content) => ({ content }))
export default ModalDimmer
````

## File: modules/Modal/ModalHeader.d.ts/ModalHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ModalHeaderProps extends StrictModalHeaderProps {
  [key: string]: any
}
export interface StrictModalHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ModalHeader: ForwardRefComponent<ModalHeaderProps, HTMLDivElement>
export default ModalHeader
````

## File: modules/Modal/ModalHeader.js/ModalHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ModalHeader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(ModalHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ModalHeader.displayName = 'ModalHeader'
ModalHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ModalHeader.create = createShorthandFactory(ModalHeader, (content) => ({ content }))
export default ModalHeader
````

## File: modules/Modal/utils/index.js/index.js
````javascript
const OFFSET = 0
const PADDING = 50
export const canFit = (modalRect) => {
  const scrollHeight = modalRect.height + OFFSET
  const height = modalRect.height + OFFSET
  const contextHeight = window.innerHeight
  const verticalCenter = contextHeight / 2
  const topOffset = -(height / 2)
  const paddingHeight = PADDING
  const startPosition = verticalCenter + topOffset
  return startPosition + scrollHeight + paddingHeight < contextHeight
}
export const getLegacyStyles = (isFitted, centered, modalRect) => {
  const marginTop = centered && isFitted ? -(modalRect.height / 2) : 0
  const marginLeft = -(modalRect.width / 2)
  return { marginLeft, marginTop }
}
export const isLegacy = () => !window.ActiveXObject && 'ActiveXObject' in window
````

## File: modules/Popup/index.d.ts/index.d.ts
````typescript
export { default, PopupProps, StrictPopupProps } from './Popup'
````

## File: modules/Popup/index.js/index.js
````javascript
export default from './Popup'
````

## File: modules/Popup/lib/createReferenceProxy.js/createReferenceProxy.js
````javascript
import _ from 'lodash'
import { isRefObject } from '../../../lib'
class ReferenceProxy {
  constructor(refObject) {
    this.ref = refObject
  }
  getBoundingClientRect() {
    return _.invoke(this.ref.current, 'getBoundingClientRect') || {}
  }
  get clientWidth() {
    return this.getBoundingClientRect().width
  }
  get clientHeight() {
    return this.getBoundingClientRect().height
  }
  get parentNode() {
    return this.ref.current ? this.ref.current.parentNode : undefined
  }
  get contextElement() {
    return this.ref.current
  }
}
const createReferenceProxy = _.memoize(
  (reference) => new ReferenceProxy(isRefObject(reference) ? reference : { current: reference }),
)
export default createReferenceProxy
````

## File: modules/Popup/lib/positions.js/positions.js
````javascript
import _ from 'lodash'
export const positionsMapping = {
  'top center': 'top',
  'top left': 'top-start',
  'top right': 'top-end',
  'bottom center': 'bottom',
  'bottom left': 'bottom-start',
  'bottom right': 'bottom-end',
  'right center': 'right',
  'left center': 'left',
}
export const positions = _.keys(positionsMapping)
export const placementMapping = _.invert(positionsMapping)
````

## File: modules/Popup/Popup.d.ts/Popup.d.ts
````typescript
import * as React from 'react'
import * as Popper from '@popperjs/core'
import { SemanticShorthandItem } from '../../generic'
import { StrictPortalProps } from '../../addons/Portal'
import PopupContent, { PopupContentProps } from './PopupContent'
import PopupHeader, { PopupHeaderProps } from './PopupHeader'
type PopperOffsetsFunctionParams = {
  popper: Popper.Rect
  reference: Popper.Rect
  placement: Popper.Placement
}
type PopperOffsetsFunction = (params: PopperOffsetsFunctionParams) => [number?, number?]
export interface PopupProps extends StrictPopupProps {
  [key: string]: any
}
export interface StrictPopupProps extends StrictPortalProps {
  as?: any
  basic?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandItem<PopupContentProps>
  context?: Document | Window | HTMLElement | React.RefObject<HTMLElement>
  disabled?: boolean
  eventsEnabled?: boolean
  flowing?: boolean
  header?: SemanticShorthandItem<PopupHeaderProps>
  hideOnScroll?: boolean
  hoverable?: boolean
  inverted?: boolean
  offset?: [number, number?] | PopperOffsetsFunction
  on?: 'hover' | 'click' | 'focus' | ('hover' | 'click' | 'focus')[]
  onClose?: (event: React.MouseEvent<HTMLElement>, data: PopupProps) => void
  onMount?: (nothing: null, data: PopupProps) => void
  onOpen?: (event: React.MouseEvent<HTMLElement>, data: PopupProps) => void
  onUnmount?: (nothing: null, data: PopupProps) => void
  pinned?: boolean
  position?:
    | 'top left'
    | 'top right'
    | 'bottom right'
    | 'bottom left'
    | 'right center'
    | 'left center'
    | 'top center'
    | 'bottom center'
  positionFixed?: boolean
  popper?: SemanticShorthandItem<React.HTMLAttributes<HTMLDivElement>>
  popperModifiers?: any[]
  popperDependencies?: any[]
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge'
  style?: React.CSSProperties
  trigger?: React.ReactNode
  wide?: boolean | 'very'
}
declare const Popup: React.FC<PopupProps> & {
  Content: typeof PopupContent
  Header: typeof PopupHeader
}
export default Popup
````

## File: modules/Popup/Popup.js/Popup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { Popper } from 'react-popper'
import shallowEqual from 'shallowequal'
import {
  childrenUtils,
  createHTMLDivision,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  makeDebugger,
  SUI,
  useIsomorphicLayoutEffect,
  getKeyOnly,
  getKeyOrValueAndKey,
  useMergedRefs,
  usePrevious,
} from '../../lib'
import Portal from '../../addons/Portal'
import { placementMapping, positions, positionsMapping } from './lib/positions'
import createReferenceProxy from './lib/createReferenceProxy'
import PopupContent from './PopupContent'
import PopupHeader from './PopupHeader'
const debug = makeDebugger('popup')
function getPortalProps(props) {
  const portalProps = {}
  const on = props.on ?? ['click', 'hover']
  const normalizedOn = _.isArray(on) ? on : [on]
  if (props.hoverable) {
    portalProps.closeOnPortalMouseLeave = true
    portalProps.mouseLeaveDelay = 300
  }
  if (_.includes(normalizedOn, 'hover')) {
    portalProps.openOnTriggerClick = false
    portalProps.closeOnTriggerClick = false
    portalProps.openOnTriggerMouseEnter = true
    portalProps.closeOnTriggerMouseLeave = true
    portalProps.mouseLeaveDelay = 70
    portalProps.mouseEnterDelay = 50
  }
  if (_.includes(normalizedOn, 'click')) {
    portalProps.openOnTriggerClick = true
    portalProps.closeOnTriggerClick = true
    portalProps.closeOnDocumentClick = true
  }
  if (_.includes(normalizedOn, 'focus')) {
    portalProps.openOnTriggerFocus = true
    portalProps.closeOnTriggerBlur = true
  }
  return portalProps
}
function partitionPortalProps(unhandledProps, disabled) {
  if (disabled) {
    return {}
  }
  const contentRestProps = _.reduce(
    unhandledProps,
    (acc, val, key) => {
      if (!_.includes(Portal.handledProps, key)) acc[key] = val
      return acc
    },
    {},
  )
  const portalRestProps = _.pick(unhandledProps, Portal.handledProps)
  return { contentRestProps, portalRestProps }
}
function usePositioningEffect(popperDependencies, positionUpdate) {
  const previousDependencies = usePrevious(popperDependencies)
  useIsomorphicLayoutEffect(() => {
    if (positionUpdate.current) {
      positionUpdate.current()
    }
  }, [shallowEqual(previousDependencies, popperDependencies)])
}
const Popup = React.forwardRef(function (props, ref) {
  const {
    basic,
    className,
    content,
    context,
    children,
    disabled = false,
    eventsEnabled = true,
    flowing,
    header,
    hideOnScroll = false,
    inverted,
    offset,
    pinned = false,
    popper,
    popperDependencies,
    popperModifiers = [],
    position = 'top left',
    positionFixed,
    size,
    style,
    trigger,
    wide,
  } = props
  const unhandledProps = getUnhandledProps(Popup, props)
  const { contentRestProps, portalRestProps } = partitionPortalProps(unhandledProps, disabled)
  const elementRef = useMergedRefs(ref)
  const positionUpdate = React.useRef()
  const triggerRef = React.useRef()
  const zIndexWasSynced = React.useRef(false)
  usePositioningEffect(popperDependencies, positionUpdate)
  const handleClose = (e) => {
    debug('handleClose()')
    _.invoke(props, 'onClose', e, { ...props, open: false })
  }
  const handleOpen = (e) => {
    debug('handleOpen()')
    _.invoke(props, 'onOpen', e, { ...props, open: true })
  }
  const handlePortalMount = (e) => {
    debug('handlePortalMount()')
    _.invoke(props, 'onMount', e, props)
  }
  const handlePortalUnmount = (e) => {
    debug('handlePortalUnmount()')
    positionUpdate.current = null
    _.invoke(props, 'onUnmount', e, props)
  }
  const renderBody = ({
    placement: popperPlacement,
    ref: popperRef,
    update,
    style: popperStyle,
  }) => {
    positionUpdate.current = update
    const classes = cx(
      'ui',
      placementMapping[popperPlacement],
      size,
      getKeyOrValueAndKey(wide, 'wide'),
      getKeyOnly(basic, 'basic'),
      getKeyOnly(flowing, 'flowing'),
      getKeyOnly(inverted, 'inverted'),
      'popup transition visible',
      className,
    )
    const ElementType = getComponentType(props)
    const styles = {
      left: 'auto',
      right: 'auto',
      position: 'initial',
      ...style,
    }
    const innerElement = (
      <ElementType {...contentRestProps} className={classes} style={styles} ref={elementRef}>
        {childrenUtils.isNil(children) ? (
          <>
            {PopupHeader.create(header, { autoGenerateKey: false })}
            {PopupContent.create(content, { autoGenerateKey: false })}
          </>
        ) : (
          children
        )}
      </ElementType>
    )
    return createHTMLDivision(popper || {}, {
      overrideProps: {
        children: innerElement,
        ref: popperRef,
        style: {
          display: 'flex',
          ...popperStyle,
        },
      },
    })
  }
  if (disabled) {
    return trigger
  }
  const modifiers = [
    { name: 'arrow', enabled: false },
    { name: 'eventListeners', options: { scroll: !!eventsEnabled, resize: !!eventsEnabled } },
    { name: 'flip', enabled: !pinned },
    { name: 'preventOverflow', enabled: !!offset },
    { name: 'offset', enabled: !!offset, options: { offset } },
    ...popperModifiers,
    {
      name: 'syncZIndex',
      enabled: true,
      phase: 'beforeRead',
      fn: ({ state }) => {
        if (zIndexWasSynced.current) {
          return
        }
        const definedZIndex = popper?.style?.zIndex
        if (_.isUndefined(definedZIndex)) {
          state.elements.popper.style.zIndex = window.getComputedStyle(
            state.elements.popper.firstChild,
          ).zIndex
        }
        zIndexWasSynced.current = true
      },
      effect: () => {
        return () => {
          zIndexWasSynced.current = false
        }
      },
    },
  ]
  debug('popper modifiers:', modifiers)
  const referenceElement = createReferenceProxy(_.isNil(context) ? triggerRef : context)
  const mergedPortalProps = { ...getPortalProps(props), ...portalRestProps }
  debug('portal props:', mergedPortalProps)
  return (
    <Portal
      {...mergedPortalProps}
      onClose={handleClose}
      onMount={handlePortalMount}
      onOpen={handleOpen}
      onUnmount={handlePortalUnmount}
      trigger={trigger}
      triggerRef={triggerRef}
      hideOnScroll={hideOnScroll}
    >
      <Popper
        modifiers={modifiers}
        placement={positionsMapping[position]}
        strategy={positionFixed ? 'fixed' : null}
        referenceElement={referenceElement}
      >
        {renderBody}
      </Popper>
    </Portal>
  )
})
Popup.displayName = 'Popup'
Popup.propTypes = {
  as: PropTypes.elementType,
  basic: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.itemShorthand,
  context: PropTypes.oneOfType([PropTypes.object, customPropTypes.refObject]),
  disabled: PropTypes.bool,
  eventsEnabled: PropTypes.bool,
  flowing: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  hideOnScroll: PropTypes.bool,
  hoverable: PropTypes.bool,
  inverted: PropTypes.bool,
  offset: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.number)]),
  on: PropTypes.oneOfType([
    PropTypes.oneOf(['hover', 'click', 'focus']),
    PropTypes.arrayOf(PropTypes.oneOf(['hover', 'click', 'focus'])),
  ]),
  onClose: PropTypes.func,
  onMount: PropTypes.func,
  onOpen: PropTypes.func,
  onUnmount: PropTypes.func,
  pinned: PropTypes.bool,
  position: PropTypes.oneOf(positions),
  positionFixed: PropTypes.bool,
  popper: customPropTypes.itemShorthand,
  popperModifiers: PropTypes.array,
  popperDependencies: PropTypes.array,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium', 'big', 'massive')),
  style: PropTypes.object,
  trigger: PropTypes.node,
  wide: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
}
Popup.Content = PopupContent
Popup.Header = PopupHeader
export default Popup
````

## File: modules/Popup/PopupContent.d.ts/PopupContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface PopupContentProps extends StrictPopupContentProps {
  [key: string]: any
}
export interface StrictPopupContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const PopupContent: ForwardRefComponent<PopupContentProps, HTMLDivElement>
export default PopupContent
````

## File: modules/Popup/PopupContent.js/PopupContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const PopupContent = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(PopupContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
PopupContent.displayName = 'PopupContent'
PopupContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
PopupContent.create = createShorthandFactory(PopupContent, (children) => ({ children }))
export default PopupContent
````

## File: modules/Popup/PopupHeader.d.ts/PopupHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface PopupHeaderProps extends StrictPopupHeaderProps {
  [key: string]: any
}
export interface StrictPopupHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const PopupHeader: ForwardRefComponent<PopupHeaderProps, HTMLDivElement>
export default PopupHeader
````

## File: modules/Popup/PopupHeader.js/PopupHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const PopupHeader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(PopupHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
PopupHeader.displayName = 'PopupHeader'
PopupHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
PopupHeader.create = createShorthandFactory(PopupHeader, (children) => ({ children }))
export default PopupHeader
````

## File: modules/Progress/index.d.ts/index.d.ts
````typescript
export { default, ProgressProps, StrictProgressProps } from './Progress'
````

## File: modules/Progress/index.js/index.js
````javascript
export default from './Progress'
````

## File: modules/Progress/Progress.d.ts/Progress.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  HtmlLabelProps,
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
export interface ProgressProps extends StrictProgressProps {
  [key: string]: any
}
export interface StrictProgressProps {
  as?: any
  active?: boolean
  attached?: 'top' | 'bottom'
  autoSuccess?: boolean
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  disabled?: boolean
  error?: boolean
  indicating?: boolean
  inverted?: boolean
  label?: SemanticShorthandItem<HtmlLabelProps>
  percent?: number | string
  precision?: number
  progress?: boolean | 'percent' | 'ratio' | 'value'
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'big'
  success?: boolean
  total?: number | string
  value?: number | string
  warning?: boolean
}
declare const Progress: ForwardRefComponent<ProgressProps, HTMLDivElement>
export default Progress
````

## File: modules/Progress/Progress.js/Progress.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createHTMLDivision,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getValueAndKey,
} from '../../lib'
function calculatePercent(percent, total, value) {
  if (!_.isUndefined(percent)) {
    return percent
  }
  if (!_.isUndefined(total) && !_.isUndefined(value)) {
    return (value / total) * 100
  }
  return 0
}
function getPercent(percent, total, value, progress, precision) {
  const clampedPercent = _.clamp(calculatePercent(percent, total, value), 0, 100)
  if (!_.isUndefined(total) && !_.isUndefined(value) && progress === 'value') {
    return (value / total) * 100
  }
  if (progress === 'value') {
    return value
  }
  if (_.isUndefined(precision)) {
    return clampedPercent
  }
  return _.round(clampedPercent, precision)
}
const Progress = React.forwardRef(function (props, ref) {
  const {
    active,
    autoSuccess,
    attached,
    children,
    className,
    color,
    content,
    disabled,
    error,
    indicating,
    inverted,
    label,
    percent,
    precision,
    progress,
    total,
    size,
    success,
    value,
    warning,
  } = props
  const calculatedPercent = getPercent(percent, total, value, progress, precision) || 0
  const isAutoSuccess = autoSuccess && (percent >= 100 || value >= total)
  const computeValueText = () => {
    if (progress === 'value') {
      return value
    }
    if (progress === 'ratio') {
      return `${value}/${total}`
    }
    return `${calculatedPercent}%`
  }
  const renderLabel = () => {
    if (!childrenUtils.isNil(children)) {
      return <div className='label'>{children}</div>
    }
    if (!childrenUtils.isNil(content)) {
      return <div className='label'>{content}</div>
    }
    return createHTMLDivision(label, {
      autoGenerateKey: false,
      defaultProps: { className: 'label' },
    })
  }
  const renderProgress = () => {
    if (!progress && _.isUndefined(precision)) {
      return
    }
    return <div className='progress'>{computeValueText()}</div>
  }
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(active || indicating, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(error, 'error'),
    getKeyOnly(indicating, 'indicating'),
    getKeyOnly(inverted, 'inverted'),
    getKeyOnly(success || isAutoSuccess, 'success'),
    getKeyOnly(warning, 'warning'),
    getValueAndKey(attached, 'attached'),
    'progress',
    className,
  )
  const rest = getUnhandledProps(Progress, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType
      {...rest}
      className={classes}
      data-percent={Math.floor(calculatedPercent)}
      ref={ref}
    >
      <div className='bar' style={{ width: `${calculatedPercent}%` }}>
        {renderProgress()}
      </div>
      {renderLabel()}
    </ElementType>
  )
})
Progress.displayName = 'Progress'
Progress.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  attached: PropTypes.oneOf(['top', 'bottom']),
  autoSuccess: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  indicating: PropTypes.bool,
  inverted: PropTypes.bool,
  label: customPropTypes.itemShorthand,
  percent: customPropTypes.every([
    customPropTypes.disallow(['total', 'value']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),
  precision: PropTypes.number,
  progress: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['percent', 'ratio', 'value'])]),
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'mini', 'huge', 'massive')),
  success: PropTypes.bool,
  total: customPropTypes.every([
    customPropTypes.demand(['value']),
    customPropTypes.disallow(['percent']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),
  value: customPropTypes.every([
    customPropTypes.disallow(['percent']),
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ]),
  warning: PropTypes.bool,
}
export default Progress
````

## File: modules/Rating/index.d.ts/index.d.ts
````typescript
export { default, RatingProps, StrictRatingProps } from './Rating'
````

## File: modules/Rating/index.js/index.js
````javascript
export default from './Rating'
````

## File: modules/Rating/Rating.d.ts/Rating.d.ts
````typescript
import * as React from 'react'
import RatingIcon from './RatingIcon'
import { ForwardRefComponent } from '../../generic'
export interface RatingProps extends StrictRatingProps {
  [key: string]: any
}
export interface StrictRatingProps {
  as?: any
  className?: string
  clearable?: boolean | 'auto'
  defaultRating?: number | string
  disabled?: boolean
  icon?: 'star' | 'heart'
  maxRating?: number | string
  onRate?: (event: React.MouseEvent<HTMLDivElement>, data: RatingProps) => void
  rating?: number | string
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'huge' | 'massive'
}
declare const Rating: ForwardRefComponent<RatingProps, HTMLDivElement> & {
  Icon: typeof RatingIcon
}
export default Rating
````

## File: modules/Rating/Rating.js/Rating.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  useAutoControlledValue,
} from '../../lib'
import RatingIcon from './RatingIcon'
const Rating = React.forwardRef(function (props, ref) {
  const { className, clearable = 'auto', disabled, icon, maxRating = 1, size } = props
  const [rating, setRating] = useAutoControlledValue({
    state: props.rating,
    defaultState: props.defaultRating,
    initialState: 0,
  })
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [isSelecting, setIsSelecting] = React.useState(false)
  const classes = cx(
    'ui',
    icon,
    size,
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(isSelecting && !disabled && selectedIndex >= 0, 'selected'),
    'rating',
    className,
  )
  const rest = getUnhandledProps(Rating, props)
  const ElementType = getComponentType(props)
  const handleIconClick = (e, { index }) => {
    if (disabled) {
      return
    }
    let newRating = index + 1
    if (clearable === 'auto' && maxRating === 1) {
      newRating = +!rating
    } else if (clearable === true && newRating === rating) {
      newRating = 0
    }
    setRating(newRating)
    setIsSelecting(false)
    _.invoke(props, 'onRate', e, { ...props, rating: newRating })
  }
  const handleIconMouseEnter = (e, { index }) => {
    if (disabled) {
      return
    }
    setSelectedIndex(index)
    setIsSelecting(true)
  }
  const handleMouseLeave = (...args) => {
    _.invoke(props, 'onMouseLeave', ...args)
    if (disabled) {
      return
    }
    setSelectedIndex(-1)
    setIsSelecting(false)
  }
  return (
    <ElementType
      role='radiogroup'
      {...rest}
      className={classes}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      tabIndex={disabled ? 0 : -1}
    >
      {_.times(maxRating, (i) => (
        <RatingIcon
          tabIndex={disabled ? -1 : 0}
          active={rating >= i + 1}
          aria-checked={rating === i + 1}
          aria-posinset={i + 1}
          aria-setsize={maxRating}
          index={i}
          key={i}
          onClick={handleIconClick}
          onMouseEnter={handleIconMouseEnter}
          selected={selectedIndex >= i && isSelecting}
        />
      ))}
    </ElementType>
  )
})
Rating.displayName = 'Rating'
Rating.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['auto'])]),
  defaultRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(['star', 'heart']),
  maxRating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onRate: PropTypes.func,
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium', 'big')),
}
Rating.Icon = RatingIcon
export default Rating
````

## File: modules/Rating/RatingIcon.d.ts/RatingIcon.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent } from '../../generic'
export interface RatingIconProps extends StrictRatingIconProps {
  [key: string]: any
}
export interface StrictRatingIconProps {
  as?: any
  active?: boolean
  className?: string
  index?: number
  onClick?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void
  onKeyUp?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void
  onMouseEnter?: (event: React.MouseEvent<HTMLElement>, data: RatingIconProps) => void
  selected?: boolean
}
declare const RatingIcon: ForwardRefComponent<RatingIconProps, HTMLElement>
export default RatingIcon
````

## File: modules/Rating/RatingIcon.js/RatingIcon.js
````javascript
import cx from 'clsx'
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { getComponentType, getUnhandledProps, getKeyOnly } from '../../lib'
const RatingIcon = React.forwardRef(function (props, ref) {
  const { active, className, selected } = props
  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(selected, 'selected'),
    'icon',
    className,
  )
  const rest = getUnhandledProps(RatingIcon, props)
  const ElementType = getComponentType(props, { defaultAs: 'i' })
  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, props)
  }
  const handleKeyUp = (e) => {
    _.invoke(props, 'onKeyUp', e, props)
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.Enter:
      case keyboardKey.Spacebar:
        e.preventDefault()
        _.invoke(props, 'onClick', e, props)
        break
      default:
    }
  }
  const handleMouseEnter = (e) => {
    _.invoke(props, 'onMouseEnter', e, props)
  }
  return (
    <ElementType
      role='radio'
      {...rest}
      className={classes}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      onMouseEnter={handleMouseEnter}
      ref={ref}
    />
  )
})
RatingIcon.displayName = 'RatingIcon'
RatingIcon.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  className: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseEnter: PropTypes.func,
  selected: PropTypes.bool,
}
export default RatingIcon
````

## File: modules/Search/index.d.ts/index.d.ts
````typescript
export { default, SearchProps, StrictSearchProps, SearchResultData } from './Search'
````

## File: modules/Search/index.js/index.js
````javascript
export default from './Search'
````

## File: modules/Search/Search.d.ts/Search.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { InputProps } from '../../elements/Input'
import SearchCategory, { SearchCategoryProps } from './SearchCategory'
import SearchResult, { SearchResultProps } from './SearchResult'
import SearchResults from './SearchResults'
import { SearchCategoryLayoutProps } from './SearchCategoryLayout'
export interface SearchProps extends StrictSearchProps {
  [key: string]: any
}
export interface StrictSearchProps {
  as?: any
  defaultOpen?: boolean
  defaultValue?: string
  icon?: any
  minCharacters?: number
  noResultsDescription?: React.ReactNode
  noResultsMessage?: React.ReactNode
  open?: boolean
  results?: any[] | Record<string, any>
  selectFirstResult?: boolean
  showNoResults?: boolean
  value?: string
  categoryLayoutRenderer?: (
    props: Pick<SearchCategoryLayoutProps, 'categoryContent' | 'resultsContent'>,
  ) => React.ReactElement<any>
  categoryRenderer?: (props: SearchCategoryProps) => React.ReactElement<any>
  resultRenderer?: (props: SearchResultProps) => React.ReactElement<any>
  onBlur?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void
  onFocus?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void
  onMouseDown?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void
  onResultSelect?: (event: React.MouseEvent<HTMLDivElement>, data: SearchResultData) => void
  onSearchChange?: (event: React.MouseEvent<HTMLElement>, data: SearchProps) => void
  onSelectionChange?: (event: React.MouseEvent<HTMLElement>, data: SearchResultData) => void
  aligned?: string
  category?: boolean
  className?: string
  fluid?: boolean
  input?: SemanticShorthandItem<InputProps>
  loading?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
  placeholder?: string
}
export interface SearchResultData extends SearchProps {
  result: any
}
declare const Search: ForwardRefComponent<SearchProps, HTMLDivElement> & {
  Category: typeof SearchCategory
  Result: typeof SearchResult
  Results: typeof SearchResults
}
export default Search
````

## File: modules/Search/Search.js/Search.js
````javascript
import cx from 'clsx'
import keyboardKey from 'keyboard-key'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import shallowEqual from 'shallowequal'
import {
  ModernAutoControlledComponent as Component,
  customPropTypes,
  eventStack,
  getComponentType,
  getUnhandledProps,
  htmlInputAttrs,
  isBrowser,
  makeDebugger,
  objectDiff,
  partitionHTMLProps,
  SUI,
  getKeyOnly,
  getValueAndKey,
} from '../../lib'
import Input from '../../elements/Input'
import SearchCategory from './SearchCategory'
import SearchCategoryLayout from './SearchCategoryLayout'
import SearchResult from './SearchResult'
import SearchResults from './SearchResults'
const debug = makeDebugger('search')
const overrideSearchInputProps = (predefinedProps) => {
  const { input } = predefinedProps
  if (_.isUndefined(input)) {
    return { ...predefinedProps, input: { className: 'prompt' } }
  }
  if (_.isPlainObject(input)) {
    return { ...predefinedProps, input: { ...input, className: cx(input.className, 'prompt') } }
  }
  return predefinedProps
}
const Search = React.forwardRef((props, ref) => {
  const {
    icon = 'search',
    input = 'text',
    minCharacters = 1,
    noResultsMessage = 'No results found.',
    showNoResults = true,
    ...rest
  } = props
  return (
    <SearchInner
      icon={icon}
      input={input}
      minCharacters={minCharacters}
      noResultsMessage={noResultsMessage}
      showNoResults={showNoResults}
      {...rest}
      innerRef={ref}
    />
  )
})
class SearchInner extends Component {
  static getAutoControlledStateFromProps(props, state) {
    debug('getAutoControlledStateFromProps()')
    if (typeof state.prevValue !== 'undefined' && shallowEqual(state.prevValue, state.value)) {
      return { prevValue: state.value }
    }
    const selectedIndex = props.selectFirstResult ? 0 : -1
    debug('value changed, setting selectedIndex', selectedIndex)
    return { prevValue: state.value, selectedIndex }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
  }
  componentDidUpdate(prevProps, prevState) {
    debug('componentDidUpdate()')
    debug('to state:', objectDiff(prevState, this.state))
    if (!prevState.focus && this.state.focus) {
      debug('search focused')
      if (!this.isMouseDown) {
        debug('mouse is not down, opening')
        this.tryOpen()
      }
      if (this.state.open) {
        eventStack.sub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter])
      }
    } else if (prevState.focus && !this.state.focus) {
      debug('search blurred')
      if (!this.isMouseDown) {
        debug('mouse is not down, closing')
        this.close()
      }
      eventStack.unsub('keydown', [this.moveSelectionOnKeyDown, this.selectItemOnEnter])
    }
    if (!prevState.open && this.state.open) {
      debug('search opened')
      this.open()
      eventStack.sub('click', this.closeOnDocumentClick)
      eventStack.sub('keydown', [
        this.closeOnEscape,
        this.moveSelectionOnKeyDown,
        this.selectItemOnEnter,
      ])
    } else if (prevState.open && !this.state.open) {
      debug('search closed')
      this.close()
      eventStack.unsub('click', this.closeOnDocumentClick)
      eventStack.unsub('keydown', [
        this.closeOnEscape,
        this.moveSelectionOnKeyDown,
        this.selectItemOnEnter,
      ])
    }
  }
  componentWillUnmount() {
    debug('componentWillUnmount()')
    eventStack.unsub('click', this.closeOnDocumentClick)
    eventStack.unsub('keydown', [
      this.closeOnEscape,
      this.moveSelectionOnKeyDown,
      this.selectItemOnEnter,
    ])
  }
  handleResultSelect = (e, result) => {
    debug('handleResultSelect()')
    debug(result)
    _.invoke(this.props, 'onResultSelect', e, { ...this.props, result })
  }
  handleSelectionChange = (e) => {
    debug('handleSelectionChange()')
    const result = this.getSelectedResult()
    _.invoke(this.props, 'onSelectionChange', e, { ...this.props, result })
  }
  closeOnEscape = (e) => {
    if (keyboardKey.getCode(e) !== keyboardKey.Escape) return
    e.preventDefault()
    this.close()
  }
  moveSelectionOnKeyDown = (e) => {
    debug('moveSelectionOnKeyDown()')
    debug(keyboardKey.getKey(e))
    switch (keyboardKey.getCode(e)) {
      case keyboardKey.ArrowDown:
        e.preventDefault()
        this.moveSelectionBy(e, 1)
        break
      case keyboardKey.ArrowUp:
        e.preventDefault()
        this.moveSelectionBy(e, -1)
        break
      default:
        break
    }
  }
  selectItemOnEnter = (e) => {
    debug('selectItemOnEnter()')
    debug(keyboardKey.getKey(e))
    if (keyboardKey.getCode(e) !== keyboardKey.Enter) return
    const result = this.getSelectedResult()
    if (!result) return
    e.preventDefault()
    this.setValue(result.title)
    this.handleResultSelect(e, result)
    this.close()
  }
  closeOnDocumentClick = (e) => {
    debug('closeOnDocumentClick()')
    debug(e)
    this.close()
  }
  handleMouseDown = (e) => {
    debug('handleMouseDown()')
    this.isMouseDown = true
    _.invoke(this.props, 'onMouseDown', e, this.props)
    eventStack.sub('mouseup', this.handleDocumentMouseUp)
  }
  handleDocumentMouseUp = () => {
    debug('handleDocumentMouseUp()')
    this.isMouseDown = false
    eventStack.unsub('mouseup', this.handleDocumentMouseUp)
  }
  handleInputClick = (e) => {
    debug('handleInputClick()', e)
    e.nativeEvent.stopImmediatePropagation()
    this.tryOpen()
  }
  handleItemClick = (e, { id }) => {
    debug('handleItemClick()')
    debug(id)
    const result = this.getSelectedResult(id)
    e.nativeEvent.stopImmediatePropagation()
    this.setValue(result.title)
    this.handleResultSelect(e, result)
    this.close()
  }
  handleItemMouseDown = (e) => {
    debug('handleItemMouseDown()')
    e.preventDefault()
  }
  handleFocus = (e) => {
    debug('handleFocus()')
    _.invoke(this.props, 'onFocus', e, this.props)
    this.setState({ focus: true })
  }
  handleBlur = (e) => {
    debug('handleBlur()')
    _.invoke(this.props, 'onBlur', e, this.props)
    this.setState({ focus: false })
  }
  handleSearchChange = (e) => {
    debug('handleSearchChange()')
    debug(e.target.value)
    e.stopPropagation()
    const { minCharacters } = this.props
    const { open } = this.state
    const newQuery = e.target.value
    _.invoke(this.props, 'onSearchChange', e, { ...this.props, value: newQuery })
    if (newQuery.length < minCharacters) {
      this.close()
    } else if (!open) {
      this.tryOpen(newQuery)
    }
    this.setValue(newQuery)
  }
  getFlattenedResults = () => {
    const { category, results } = this.props
    return !category
      ? results
      : _.reduce(results, (memo, categoryData) => memo.concat(categoryData.results), [])
  }
  getSelectedResult = (index = this.state.selectedIndex) => {
    const results = this.getFlattenedResults()
    return _.get(results, index)
  }
  setValue = (value) => {
    debug('setValue()')
    debug('value', value)
    const { selectFirstResult } = this.props
    this.setState({ value, selectedIndex: selectFirstResult ? 0 : -1 })
  }
  moveSelectionBy = (e, offset) => {
    debug('moveSelectionBy()')
    debug(`offset: ${offset}`)
    const { selectedIndex } = this.state
    const results = this.getFlattenedResults()
    const lastIndex = results.length - 1
    let nextIndex = selectedIndex + offset
    if (nextIndex > lastIndex) nextIndex = 0
    else if (nextIndex < 0) nextIndex = lastIndex
    this.setState({ selectedIndex: nextIndex })
    this.scrollSelectedItemIntoView()
    this.handleSelectionChange(e)
  }
  scrollSelectedItemIntoView = () => {
    debug('scrollSelectedItemIntoView()')
    if (!isBrowser()) return
    const menu = document.querySelector('.ui.search.active.visible .results.visible')
    if (!menu) return
    debug(`menu (results): ${menu}`)
    const item = menu.querySelector('.result.active')
    if (!item) return
    debug(`menu (results): ${menu}`)
    debug(`item (result): ${item}`)
    const isOutOfUpperView = item.offsetTop < menu.scrollTop
    const isOutOfLowerView = item.offsetTop + item.clientHeight > menu.scrollTop + menu.clientHeight
    if (isOutOfUpperView) {
      menu.scrollTop = item.offsetTop
    } else if (isOutOfLowerView) {
      menu.scrollTop = item.offsetTop + item.clientHeight - menu.clientHeight
    }
  }
  tryOpen = (currentValue = this.state.value) => {
    debug('open()')
    const { minCharacters } = this.props
    if (currentValue.length < minCharacters) return
    this.open()
  }
  open = () => {
    debug('open()')
    this.setState({ open: true })
  }
  close = () => {
    debug('close()')
    this.setState({ open: false })
  }
  renderSearchInput = (rest) => {
    const { icon, input, placeholder } = this.props
    const { value } = this.state
    return Input.create(input, {
      autoGenerateKey: false,
      defaultProps: {
        ...rest,
        autoComplete: 'off',
        icon,
        onChange: this.handleSearchChange,
        onClick: this.handleInputClick,
        tabIndex: '0',
        value,
        placeholder,
      },
      overrideProps: overrideSearchInputProps,
    })
  }
  renderNoResults = () => {
    const { noResultsDescription, noResultsMessage } = this.props
    return (
      <div className='message empty'>
        <div className='header'>{noResultsMessage}</div>
        {noResultsDescription && <div className='description'>{noResultsDescription}</div>}
      </div>
    )
  }
  renderResult = ({ childKey, ...result }, index, _array, offset = 0) => {
    const { resultRenderer } = this.props
    const { selectedIndex } = this.state
    const offsetIndex = index + offset
    return (
      <SearchResult
        key={childKey ?? (result.id || result.title)}
        active={selectedIndex === offsetIndex}
        onClick={this.handleItemClick}
        onMouseDown={this.handleItemMouseDown}
        renderer={resultRenderer}
        {...result}
        id={offsetIndex}
      />
    )
  }
  renderResults = () => {
    const { results } = this.props
    return _.map(results, this.renderResult)
  }
  renderCategories = () => {
    const { categoryLayoutRenderer, categoryRenderer, results: categories } = this.props
    const { selectedIndex } = this.state
    let count = 0
    return _.map(categories, ({ childKey, ...category }) => {
      const categoryProps = {
        key: childKey ?? category.name,
        active: _.inRange(selectedIndex, count, count + category.results.length),
        layoutRenderer: categoryLayoutRenderer,
        renderer: categoryRenderer,
        ...category,
      }
      const renderFn = _.partialRight(this.renderResult, count)
      count += category.results.length
      return <SearchCategory {...categoryProps}>{category.results.map(renderFn)}</SearchCategory>
    })
  }
  renderMenuContent = () => {
    const { category, showNoResults, results } = this.props
    if (_.isEmpty(results)) {
      return showNoResults ? this.renderNoResults() : null
    }
    return category ? this.renderCategories() : this.renderResults()
  }
  renderResultsMenu = () => {
    const { open } = this.state
    const resultsClasses = open ? 'visible' : ''
    const menuContent = this.renderMenuContent()
    if (!menuContent) return
    return <SearchResults className={resultsClasses}>{menuContent}</SearchResults>
  }
  render() {
    debug('render()')
    debug('props', this.props)
    debug('state', this.state)
    const { searchClasses, focus, open } = this.state
    const { aligned, category, className, innerRef, fluid, loading, size } = this.props
    const classes = cx(
      'ui',
      open && 'active visible',
      size,
      searchClasses,
      getKeyOnly(category, 'category'),
      getKeyOnly(focus, 'focus'),
      getKeyOnly(fluid, 'fluid'),
      getKeyOnly(loading, 'loading'),
      getValueAndKey(aligned, 'aligned'),
      'search',
      className,
    )
    const unhandled = getUnhandledProps(Search, this.props)
    const ElementType = getComponentType(this.props)
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, {
      htmlProps: htmlInputAttrs,
    })
    return (
      <ElementType
        {...rest}
        className={classes}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
        ref={innerRef}
      >
        {this.renderSearchInput(htmlInputProps)}
        {this.renderResultsMenu()}
      </ElementType>
    )
  }
}
Search.displayName = 'Search'
Search.propTypes = {
  as: PropTypes.elementType,
  defaultOpen: PropTypes.bool,
  defaultValue: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  minCharacters: PropTypes.number,
  noResultsDescription: PropTypes.node,
  noResultsMessage: PropTypes.node,
  open: PropTypes.bool,
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape(SearchResult.propTypes)),
    PropTypes.shape(SearchCategory.propTypes),
  ]),
  selectFirstResult: PropTypes.bool,
  showNoResults: PropTypes.bool,
  value: PropTypes.string,
  categoryLayoutRenderer: PropTypes.func,
  categoryRenderer: PropTypes.func,
  resultRenderer: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onResultSelect: PropTypes.func,
  onSearchChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  aligned: PropTypes.string,
  category: PropTypes.bool,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  input: customPropTypes.itemShorthand,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  placeholder: PropTypes.string,
}
SearchInner.autoControlledProps = ['open', 'value']
if (process.env.NODE_ENV !== 'production') {
  SearchInner.propTypes = Search.propTypes
}
Search.Category = SearchCategory
Search.CategoryLayout = SearchCategoryLayout
Search.Result = SearchResult
Search.Results = SearchResults
export default Search
````

## File: modules/Search/SearchCategory.d.ts/SearchCategory.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import { SearchCategoryLayoutProps } from './SearchCategoryLayout'
import SearchResult from './SearchResult'
export interface SearchCategoryProps extends StrictSearchCategoryProps {
  [key: string]: any
}
export interface StrictSearchCategoryProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  name?: string
  layoutRenderer?: (
    props: Pick<SearchCategoryLayoutProps, 'categoryContent' | 'resultsContent'>,
  ) => React.ReactElement<any>
  renderer?: (props: SearchCategoryProps) => React.ReactElement<any>
  results?: typeof SearchResult[]
}
declare const SearchCategory: ForwardRefComponent<SearchCategoryProps, HTMLDivElement>
export default SearchCategory
````

## File: modules/Search/SearchCategory.js/SearchCategory.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import SearchCategoryLayout from './SearchCategoryLayout'
const SearchCategory = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    layoutRenderer = SearchCategoryLayout,
    renderer = ({ name }) => name,
  } = props
  const classes = cx(getKeyOnly(active, 'active'), 'category', className)
  const rest = getUnhandledProps(SearchCategory, props)
  const ElementType = getComponentType(props)
  const categoryContent = renderer(props)
  const resultsContent = childrenUtils.isNil(children) ? content : children
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {layoutRenderer({ categoryContent, resultsContent })}
    </ElementType>
  )
})
SearchCategory.displayName = 'SearchCategory'
SearchCategory.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  name: PropTypes.string,
  layoutRenderer: PropTypes.func,
  renderer: PropTypes.func,
  results: PropTypes.array,
}
export default SearchCategory
````

## File: modules/Search/SearchCategoryLayout.d.ts/SearchCategoryLayout.d.ts
````typescript
import * as React from 'react'
export interface SearchCategoryLayoutProps extends StrictSearchCategoryLayoutProps {
  [key: string]: any
}
export interface StrictSearchCategoryLayoutProps {
  categoryContent: React.ReactElement<any>
  resultsContent: React.ReactElement<any>
}
declare const SearchCategoryLayout: React.FC<SearchCategoryLayoutProps>
export default SearchCategoryLayout
````

## File: modules/Search/SearchCategoryLayout.js/SearchCategoryLayout.js
````javascript
import PropTypes from 'prop-types'
import * as React from 'react'
function SearchCategoryLayout(props) {
  const { categoryContent, resultsContent } = props
  return (
    <>
      <div className='name'>{categoryContent}</div>
      <div className='results'>{resultsContent}</div>
    </>
  )
}
SearchCategoryLayout.propTypes = {
  categoryContent: PropTypes.element.isRequired,
  resultsContent: PropTypes.element.isRequired,
}
export default SearchCategoryLayout
````

## File: modules/Search/SearchResult.d.ts/SearchResult.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface SearchResultProps extends StrictSearchResultProps {
  [key: string]: any
}
export interface StrictSearchResultProps {
  as?: any
  active?: boolean
  className?: string
  content?: SemanticShorthandContent
  description?: string
  id?: number | string
  image?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>, data: SearchResultProps) => void
  price?: string
  renderer?: (props: SearchResultProps) => React.ReactElement<any>[]
  title: string
}
declare const SearchResult: ForwardRefComponent<SearchResultProps, HTMLDivElement>
export default SearchResult
````

## File: modules/Search/SearchResult.js/SearchResult.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  createHTMLImage,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const defaultRenderer = ({ image, price, title, description }) => [
  image && (
    <div key='image' className='image'>
      {createHTMLImage(image, { autoGenerateKey: false })}
    </div>
  ),
  <div key='content' className='content'>
    {price && <div className='price'>{price}</div>}
    {title && <div className='title'>{title}</div>}
    {description && <div className='description'>{description}</div>}
  </div>,
]
const SearchResult = React.forwardRef(function (props, ref) {
  const { active, className, renderer = defaultRenderer } = props
  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, props)
  }
  const classes = cx(getKeyOnly(active, 'active'), 'result', className)
  const rest = getUnhandledProps(SearchResult, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
      {renderer(props)}
    </ElementType>
  )
})
SearchResult.displayName = 'SearchResult'
SearchResult.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string,
  onClick: PropTypes.func,
  price: PropTypes.string,
  renderer: PropTypes.func,
  title: PropTypes.string.isRequired,
}
export default SearchResult
````

## File: modules/Search/SearchResults.d.ts/SearchResults.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface SearchResultsProps extends StrictSearchResultsProps {
  [key: string]: any
}
export interface StrictSearchResultsProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const SearchResults: ForwardRefComponent<SearchResultsProps, HTMLDivElement>
export default SearchResults
````

## File: modules/Search/SearchResults.js/SearchResults.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const SearchResults = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('results transition', className)
  const rest = getUnhandledProps(SearchResults, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
SearchResults.displayName = 'SearchResults'
SearchResults.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default SearchResults
````

## File: modules/Sidebar/index.d.ts/index.d.ts
````typescript
export { default, SidebarProps, StrictSidebarProps } from './Sidebar'
````

## File: modules/Sidebar/index.js/index.js
````javascript
export default from './Sidebar'
````

## File: modules/Sidebar/Sidebar.d.ts/Sidebar.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import SidebarPushable from './SidebarPushable'
import SidebarPusher from './SidebarPusher'
export interface SidebarProps extends StrictSidebarProps {
  [key: string]: any
}
export interface StrictSidebarProps {
  as?: any
  animation?: 'overlay' | 'push' | 'scale down' | 'uncover' | 'slide out' | 'slide along'
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  direction?: 'top' | 'right' | 'bottom' | 'left'
  onHide?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void
  onHidden?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void
  onShow?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void
  onVisible?: (event: React.MouseEvent<HTMLElement>, data: SidebarProps) => void
  target?: Document | Window | HTMLElement | React.RefObject<HTMLElement>
  visible?: boolean
  width?: 'very thin' | 'thin' | 'wide' | 'very wide'
}
declare const Sidebar: ForwardRefComponent<SidebarProps, HTMLDivElement> & {
  Pushable: typeof SidebarPushable
  Pusher: typeof SidebarPusher
}
export default Sidebar
````

## File: modules/Sidebar/Sidebar.js/Sidebar.js
````javascript
import { EventListener, documentRef } from '@fluentui/react-component-event-listener'
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  doesNodeContainClick,
  getUnhandledProps,
  getComponentType,
  isRefObject,
  getKeyOnly,
  useIsomorphicLayoutEffect,
  useEventCallback,
  useForceUpdate,
  useMergedRefs,
  usePrevious,
} from '../../lib'
import SidebarPushable from './SidebarPushable'
import SidebarPusher from './SidebarPusher'
function useAnimationTick(visible) {
  const previousVisible = usePrevious(visible)
  const tickIncrement = !!visible === !!previousVisible ? 0 : 1
  const animationTick = React.useRef(0)
  const forceUpdate = useForceUpdate()
  const currentTick = animationTick.current + tickIncrement
  const resetAnimationTick = React.useCallback(() => {
    animationTick.current = 0
    forceUpdate()
  }, [])
  React.useEffect(() => {
    animationTick.current = currentTick
  })
  return [currentTick, resetAnimationTick]
}
const Sidebar = React.forwardRef((props, ref) => {
  const {
    animation,
    className,
    children,
    content,
    direction = 'left',
    target = documentRef,
    visible = false,
    width,
  } = props
  const [animationTick, resetAnimationTick] = useAnimationTick(visible)
  const elementRef = useMergedRefs(ref, React.useRef())
  const animationTimer = React.useRef()
  const skipNextCallback = React.useRef()
  const handleAnimationEnd = useEventCallback(() => {
    const callback = visible ? 'onShow' : 'onHidden'
    resetAnimationTick()
    _.invoke(props, callback, null, props)
  })
  const handleAnimationStart = useEventCallback(() => {
    const callback = visible ? 'onVisible' : 'onHide'
    clearTimeout(animationTimer.current)
    animationTimer.current = setTimeout(handleAnimationEnd, Sidebar.animationDuration)
    if (skipNextCallback.current) {
      skipNextCallback.current = false
      return
    }
    _.invoke(props, callback, null, props)
  })
  const handleDocumentClick = (e) => {
    if (!doesNodeContainClick(elementRef.current, e)) {
      skipNextCallback.current = true
      _.invoke(props, 'onHide', e, { ...props, visible: false })
    }
  }
  useIsomorphicLayoutEffect(() => {
    handleAnimationStart()
  }, [animationTick])
  React.useEffect(() => {
    return () => {
      clearTimeout(animationTimer.current)
    }
  }, [])
  const classes = cx(
    'ui',
    animation,
    direction,
    width,
    getKeyOnly(animationTick > 0, 'animating'),
    getKeyOnly(visible, 'visible'),
    'sidebar',
    className,
  )
  const rest = getUnhandledProps(Sidebar, props)
  const ElementType = getComponentType(props)
  const targetProp = isRefObject(target) ? { targetRef: target } : { target }
  return (
    <>
      <ElementType {...rest} className={classes} ref={elementRef}>
        {childrenUtils.isNil(children) ? content : children}
      </ElementType>
      {visible && <EventListener listener={handleDocumentClick} type='click' {...targetProp} />}
    </>
  )
})
Sidebar.displayName = 'Sidebar'
Sidebar.propTypes = {
  as: PropTypes.elementType,
  animation: PropTypes.oneOf([
    'overlay',
    'push',
    'scale down',
    'uncover',
    'slide out',
    'slide along',
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
  onShow: PropTypes.func,
  onVisible: PropTypes.func,
  target: PropTypes.oneOfType([customPropTypes.domNode, customPropTypes.refObject]),
  visible: PropTypes.bool,
  width: PropTypes.oneOf(['very thin', 'thin', 'wide', 'very wide']),
}
Sidebar.animationDuration = 500
Sidebar.Pushable = SidebarPushable
Sidebar.Pusher = SidebarPusher
export default Sidebar
````

## File: modules/Sidebar/SidebarPushable.d.ts/SidebarPushable.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface SidebarPushableProps extends StrictSidebarPushableProps {
  [key: string]: any
}
export interface StrictSidebarPushableProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const SidebarPushable: ForwardRefComponent<SidebarPushableProps, HTMLDivElement>
export default SidebarPushable
````

## File: modules/Sidebar/SidebarPushable.js/SidebarPushable.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const SidebarPushable = React.forwardRef(function (props, ref) {
  const { className, children, content } = props
  const classes = cx('pushable', className)
  const rest = getUnhandledProps(SidebarPushable, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
SidebarPushable.displayName = 'SidebarPushable'
SidebarPushable.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default SidebarPushable
````

## File: modules/Sidebar/SidebarPusher.d.ts/SidebarPusher.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface SidebarPusherProps extends StrictSidebarPusherProps {
  [key: string]: any
}
export interface StrictSidebarPusherProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  dimmed?: boolean
}
declare const SidebarPusher: ForwardRefComponent<SidebarPusherProps, HTMLDivElement>
export default SidebarPusher
````

## File: modules/Sidebar/SidebarPusher.js/SidebarPusher.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const SidebarPusher = React.forwardRef(function (props, ref) {
  const { className, dimmed, children, content } = props
  const classes = cx('pusher', getKeyOnly(dimmed, 'dimmed'), className)
  const rest = getUnhandledProps(SidebarPusher, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
SidebarPusher.displayName = 'SidebarPusher'
SidebarPusher.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  dimmed: PropTypes.bool,
}
export default SidebarPusher
````

## File: modules/Sticky/index.d.ts/index.d.ts
````typescript
export { default, StickyProps, StrictStickyProps } from './Sticky'
````

## File: modules/Sticky/index.js/index.js
````javascript
export default from './Sticky'
````

## File: modules/Sticky/Sticky.d.ts/Sticky.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent } from '../../generic'
export interface StickyProps extends StrictStickyProps {
  [key: string]: any
}
export interface StrictStickyProps {
  as?: any
  active?: boolean
  bottomOffset?: number
  children?: React.ReactNode
  className?: string
  context?: Document | Window | HTMLElement | React.Ref<HTMLElement>
  offset?: number
  onBottom?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void
  onStick?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void
  onTop?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void
  onUnstick?: (event: React.MouseEvent<HTMLElement>, data: StickyProps) => void
  pushing?: boolean
  scrollContext?: Document | Window | HTMLElement | React.Ref<HTMLElement>
  styleElement?: React.CSSProperties
}
declare const Sticky: ForwardRefComponent<StickyProps, HTMLDivElement>
export default Sticky
````

## File: modules/Sticky/Sticky.js/Sticky.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  isRefObject,
  isBrowser,
  useEventCallback,
  useIsomorphicLayoutEffect,
} from '../../lib'
const Sticky = React.forwardRef(function (props, ref) {
  const {
    active = true,
    bottomOffset = 0,
    children,
    className,
    context,
    offset = 0,
    scrollContext = isBrowser() ? window : null,
    styleElement,
  } = props
  const [sticky, setSticky] = React.useState(false)
  const [bound, setBound] = React.useState()
  const [bottom, setBottom] = React.useState()
  const [pushing, setPushing] = React.useState()
  const [top, setTop] = React.useState()
  const stickyRef = React.useRef()
  const triggerRef = React.useRef()
  const triggerRect = React.useRef()
  const contextRect = React.useRef()
  const stickyRect = React.useRef()
  const frameId = React.useRef()
  const ticking = React.useRef()
  const assignRects = () => {
    const contextNode = isRefObject(context) ? context.current : context || document.body
    triggerRect.current = triggerRef.current.getBoundingClientRect()
    contextRect.current = contextNode.getBoundingClientRect()
    stickyRect.current = stickyRef.current.getBoundingClientRect()
  }
  const computeStyle = () => {
    if (!sticky) {
      return styleElement
    }
    return {
      bottom: bound ? 0 : bottom,
      top: bound ? undefined : top,
      width: triggerRect.current.width,
      ...styleElement,
    }
  }
  const didReachContextBottom = () =>
    stickyRect.current.height + offset >= contextRect.current.bottom
  const didReachStartingPoint = () => stickyRect.current.top <= triggerRect.current.top
  const didTouchScreenTop = () => triggerRect.current.top < offset
  const didTouchScreenBottom = () => contextRect.current.bottom + bottomOffset > window.innerHeight
  const isOversized = () => stickyRect.current.height > window.innerHeight
  const togglePushing = (value) => {
    if (props.pushing) {
      setPushing(value)
    }
  }
  const setSticked = (e, newBound) => {
    setBound(newBound)
    setSticky(true)
    _.invoke(props, 'onStick', e, props)
  }
  const setUnsticked = (e, newBound) => {
    setBound(newBound)
    setSticky(false)
    _.invoke(props, 'onUnstick', e, props)
  }
  const stickToContextBottom = (e) => {
    setSticked(e, true)
    togglePushing(true)
    _.invoke(props, 'onBottom', e, props)
  }
  const stickToContextTop = (e) => {
    setUnsticked(e, false)
    togglePushing(false)
    _.invoke(props, 'onTop', e, props)
  }
  const stickToScreenBottom = (e) => {
    setSticked(e, false)
    setBottom(bottomOffset)
    setTop(null)
  }
  const stickToScreenTop = (e) => {
    setSticked(e, false)
    setBottom(null)
    setTop(offset)
  }
  const update = (e) => {
    ticking.current = false
    assignRects()
    if (pushing) {
      if (didReachStartingPoint()) {
        stickToContextTop(e)
        return
      }
      if (didTouchScreenBottom()) {
        stickToScreenBottom(e)
        return
      }
      stickToContextBottom(e)
      return
    }
    if (isOversized()) {
      if (contextRect.current.top > 0) {
        stickToContextTop(e)
        return
      }
      if (contextRect.current.bottom < window.innerHeight) {
        stickToContextBottom(e)
        return
      }
    }
    if (didTouchScreenTop()) {
      if (didReachContextBottom()) {
        stickToContextBottom(e)
        return
      }
      stickToScreenTop(e)
      return
    }
    stickToContextTop(e)
  }
  const handleUpdate = useEventCallback((e) => {
    if (!ticking.current) {
      ticking.current = true
      frameId.current = requestAnimationFrame(() => update(e))
    }
  })
  useIsomorphicLayoutEffect(() => {
    if (!active) {
      setSticky(false)
    }
  }, [active])
  useIsomorphicLayoutEffect(() => {
    if (active) {
      handleUpdate()
    }
  }, [active])
  React.useEffect(() => {
    return () => {
      cancelAnimationFrame(frameId.current)
    }
  }, [])
  React.useEffect(() => {
    const scrollContextNode = isRefObject(scrollContext) ? scrollContext.current : scrollContext
    if (active && scrollContextNode) {
      scrollContextNode?.addEventListener('resize', handleUpdate)
      scrollContextNode?.addEventListener('scroll', handleUpdate)
    }
    return () => {
      scrollContextNode?.removeEventListener('resize', handleUpdate)
      scrollContextNode?.removeEventListener('scroll', handleUpdate)
    }
  }, [active, scrollContext])
  const rest = getUnhandledProps(Sticky, props)
  const ElementType = getComponentType(props)
  const containerClasses = cx(
    sticky && 'ui',
    sticky && 'stuck-container',
    sticky && (bound ? 'bound-container' : 'fixed-container'),
    className,
  )
  const elementClasses = cx(
    'ui',
    sticky && (bound ? 'bound bottom' : 'fixed'),
    sticky && !bound && (bottom === null ? 'top' : 'bottom'),
    'sticky',
  )
  const triggerStyles = sticky ? { height: stickyRect.current?.height } : {}
  return (
    <ElementType {...rest} className={containerClasses} ref={ref}>
      <div ref={triggerRef} style={triggerStyles} />
      <div className={elementClasses} ref={stickyRef} style={computeStyle()}>
        {children}
      </div>
    </ElementType>
  )
})
Sticky.displayName = 'Sticky'
Sticky.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  bottomOffset: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  context: PropTypes.oneOfType([customPropTypes.domNode, customPropTypes.refObject]),
  offset: PropTypes.number,
  onBottom: PropTypes.func,
  onStick: PropTypes.func,
  onTop: PropTypes.func,
  onUnstick: PropTypes.func,
  pushing: PropTypes.bool,
  scrollContext: PropTypes.oneOfType([customPropTypes.domNode, customPropTypes.refObject]),
  styleElement: PropTypes.object,
}
export default Sticky
````

## File: modules/Tab/index.d.ts/index.d.ts
````typescript
export { default, TabProps, StrictTabProps } from './Tab'
````

## File: modules/Tab/index.js/index.js
````javascript
export default from './Tab'
````

## File: modules/Tab/Tab.d.ts/Tab.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import TabPane, { TabPaneProps } from './TabPane'
export interface TabProps extends StrictTabProps {
  [key: string]: any
}
export interface StrictTabProps {
  as?: any
  defaultActiveIndex?: number | string
  activeIndex?: number | string
  menu?: any
  menuPosition?: 'left' | 'right'
  grid?: any
  onTabChange?: (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => void
  panes?: {
    pane?: SemanticShorthandItem<TabPaneProps>
    menuItem?: any
    render?: () => React.ReactNode
  }[]
  renderActiveOnly?: boolean
}
declare const Tab: ForwardRefComponent<TabProps, HTMLDivElement> & {
  Pane: typeof TabPane
}
export default Tab
````

## File: modules/Tab/Tab.js/Tab.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  useAutoControlledValue,
} from '../../lib'
import Grid from '../../collections/Grid/Grid'
import GridColumn from '../../collections/Grid/GridColumn'
import Menu from '../../collections/Menu/Menu'
import TabPane from './TabPane'
const Tab = React.forwardRef(function (props, ref) {
  const {
    grid = { paneWidth: 12, tabWidth: 4 },
    menu = { attached: true, tabular: true },
    menuPosition,
    panes,
    renderActiveOnly = true,
  } = props
  const [activeIndex, setActiveIndex] = useAutoControlledValue({
    state: props.activeIndex,
    defaultState: props.defaultActiveIndex,
    initialState: 0,
  })
  const handleItemClick = (e, { index }) => {
    _.invoke(props, 'onTabChange', e, { ...props, activeIndex: index })
    setActiveIndex(index)
  }
  const renderItems = () => {
    if (renderActiveOnly) {
      return _.invoke(_.get(panes, `[${activeIndex}]`), 'render', props)
    }
    return _.map(panes, ({ pane }, index) =>
      TabPane.create(pane, {
        overrideProps: {
          active: index === activeIndex,
        },
      }),
    )
  }
  const renderMenu = () => {
    if (menu.tabular === true && menuPosition === 'right') {
      menu.tabular = 'right'
    }
    return Menu.create(menu, {
      autoGenerateKey: false,
      overrideProps: {
        items: _.map(panes, 'menuItem'),
        onItemClick: handleItemClick,
        activeIndex,
      },
    })
  }
  const renderVertical = (menuElement) => {
    const { paneWidth, tabWidth, ...gridProps } = grid
    const position = menuPosition || (menuElement.props.tabular === 'right' && 'right') || 'left'
    return (
      <Grid {...gridProps}>
        {position === 'left' &&
          GridColumn.create({ width: tabWidth, children: menuElement }, { autoGenerateKey: false })}
        {GridColumn.create(
          {
            width: paneWidth,
            children: renderItems(),
            stretched: true,
          },
          { autoGenerateKey: false },
        )}
        {position === 'right' &&
          GridColumn.create({ width: tabWidth, children: menuElement }, { autoGenerateKey: false })}
      </Grid>
    )
  }
  const menuElement = renderMenu()
  const rest = getUnhandledProps(Tab, props)
  const ElementType = getComponentType(props)
  if (menuElement.props.vertical) {
    return (
      <ElementType {...rest} ref={ref}>
        {renderVertical(menuElement)}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} ref={ref}>
      {menuElement.props.attached !== 'bottom' && menuElement}
      {renderItems()}
      {menuElement.props.attached === 'bottom' && menuElement}
    </ElementType>
  )
})
Tab.displayName = 'Tab'
Tab.propTypes = {
  as: PropTypes.elementType,
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  activeIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  menu: PropTypes.object,
  menuPosition: PropTypes.oneOf(['left', 'right']),
  grid: PropTypes.object,
  onTabChange: PropTypes.func,
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: customPropTypes.itemShorthand,
      pane: customPropTypes.itemShorthand,
      render: PropTypes.func,
    }),
  ),
  renderActiveOnly: PropTypes.bool,
}
Tab.Pane = TabPane
export default Tab
````

## File: modules/Tab/TabPane.d.ts/TabPane.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface TabPaneProps extends StrictTabPaneProps {
  [key: string]: any
}
export interface StrictTabPaneProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  loading?: boolean
}
declare const TabPane: ForwardRefComponent<TabPaneProps, HTMLDivElement>
export default TabPane
````

## File: modules/Tab/TabPane.js/TabPane.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import Segment from '../../elements/Segment/Segment'
const TabPane = React.forwardRef(function (props, ref) {
  const { active = true, children, className, content, loading } = props
  const classes = cx(getKeyOnly(active, 'active'), getKeyOnly(loading, 'loading'), 'tab', className)
  const rest = getUnhandledProps(TabPane, props)
  const ElementType = getComponentType(props, { defaultAs: Segment })
  const calculatedDefaultProps = {}
  if (ElementType === Segment) {
    calculatedDefaultProps.attached = 'bottom'
  }
  return (
    <ElementType {...calculatedDefaultProps} {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
TabPane.displayName = 'TabPane'
TabPane.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  loading: PropTypes.bool,
}
TabPane.create = createShorthandFactory(TabPane, (content) => ({ content }))
export default TabPane
````

## File: modules/Transition/index.d.ts/index.d.ts
````typescript
export {
  default,
  TransitionProps,
  StrictTransitionProps,
  TransitionPropDuration,
  TRANSITION_STATUSES,
} from './Transition'
````

## File: modules/Transition/index.js/index.js
````javascript
export default from './Transition'
````

## File: modules/Transition/Transition.d.ts/Transition.d.ts
````typescript
import * as React from 'react'
import { SemanticTRANSITIONS } from '../../generic'
import TransitionGroup from './TransitionGroup'
export type TRANSITION_STATUSES = 'ENTERED' | 'ENTERING' | 'EXITED' | 'EXITING' | 'UNMOUNTED'
export interface TransitionProps extends StrictTransitionProps {
  [key: string]: any
}
export interface StrictTransitionProps {
  animation?: SemanticTRANSITIONS | string
  children?: React.ReactNode
  directional?: boolean
  duration?: number | string | TransitionPropDuration
  visible?: boolean
  mountOnShow?: boolean
  onComplete?: (nothing: null, data: TransitionEventData) => void
  onHide?: (nothing: null, data: TransitionEventData) => void
  onShow?: (nothing: null, data: TransitionEventData) => void
  onStart?: (nothing: null, data: TransitionEventData) => void
  reactKey?: string
  transitionOnMount?: boolean
  unmountOnHide?: boolean
}
export interface TransitionEventData extends TransitionProps {
  status: TRANSITION_STATUSES
}
export interface TransitionPropDuration {
  hide: number
  show: number
}
interface TransitionComponent extends React.ComponentClass<TransitionProps> {
  Group: typeof TransitionGroup
}
declare const Transition: TransitionComponent
export default Transition
````

## File: modules/Transition/Transition.js/Transition.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { makeDebugger, normalizeTransitionDuration, SUI, getKeyOnly } from '../../lib'
import TransitionGroup from './TransitionGroup'
import {
  computeStatuses,
  TRANSITION_STATUS_ENTERED,
  TRANSITION_STATUS_ENTERING,
  TRANSITION_STATUS_EXITED,
  TRANSITION_STATUS_EXITING,
  TRANSITION_STATUS_INITIAL,
  TRANSITION_STATUS_UNMOUNTED,
} from './utils/computeStatuses'
const debug = makeDebugger('transition')
const TRANSITION_CALLBACK_TYPE = {
  [TRANSITION_STATUS_ENTERED]: 'show',
  [TRANSITION_STATUS_EXITED]: 'hide',
}
const TRANSITION_STYLE_TYPE = {
  [TRANSITION_STATUS_ENTERING]: 'show',
  [TRANSITION_STATUS_EXITING]: 'hide',
}
export default class Transition extends React.Component {
  static Group = TransitionGroup
  state = {
    status: TRANSITION_STATUS_INITIAL,
  }
  static getDerivedStateFromProps(props, state) {
    const derivedState = computeStatuses({
      mountOnShow: props.mountOnShow,
      status: state.status,
      transitionOnMount: props.transitionOnMount,
      visible: props.visible,
      unmountOnHide: props.unmountOnHide,
    })
    debug('getDerivedStateFromProps()', props, state, derivedState)
    return derivedState
  }
  componentDidMount() {
    debug('componentDidMount()')
    this.updateStatus({})
  }
  componentDidUpdate(prevProps, prevState) {
    debug('componentDidUpdate()')
    this.updateStatus(prevState)
  }
  componentWillUnmount() {
    debug('componentWillUnmount()')
    clearTimeout(this.timeoutId)
  }
  handleStart = (nextStatus) => {
    const { duration } = this.props
    const durationType = TRANSITION_CALLBACK_TYPE[nextStatus]
    const durationValue = normalizeTransitionDuration(duration, durationType)
    if (durationValue === 0) {
      this.setState({ status: nextStatus })
    } else {
      this.timeoutId = setTimeout(() => this.setState({ status: nextStatus }), durationValue)
    }
  }
  updateStatus = (prevState) => {
    if (prevState.status !== this.state.status) {
      clearTimeout(this.timeoutId)
      if (this.state.nextStatus) {
        this.handleStart(this.state.nextStatus)
      }
    }
    if (!prevState.animating && this.state.animating) {
      _.invoke(this.props, 'onStart', null, { ...this.props, status: this.state.status })
    }
    if (prevState.animating && !this.state.animating) {
      const callback = this.state.status === TRANSITION_STATUS_ENTERED ? 'onShow' : 'onHide'
      _.invoke(this.props, 'onComplete', null, { ...this.props, status: this.state.status })
      _.invoke(this.props, callback, null, { ...this.props, status: this.state.status })
    }
  }
  computeClasses = () => {
    const { animation, directional, children } = this.props
    const { animating, status } = this.state
    const childClasses = _.get(children, 'props.className')
    const isDirectional = _.isNil(directional)
      ? _.includes(SUI.DIRECTIONAL_TRANSITIONS, animation)
      : directional
    if (isDirectional) {
      return cx(
        animation,
        childClasses,
        getKeyOnly(animating, 'animating'),
        getKeyOnly(status === TRANSITION_STATUS_ENTERING, 'in'),
        getKeyOnly(status === TRANSITION_STATUS_EXITING, 'out'),
        getKeyOnly(status === TRANSITION_STATUS_EXITED, 'hidden'),
        getKeyOnly(status !== TRANSITION_STATUS_EXITED, 'visible'),
        'transition',
      )
    }
    return cx(animation, childClasses, getKeyOnly(animating, 'animating transition'))
  }
  computeStyle = () => {
    const { children, duration } = this.props
    const { status } = this.state
    const childStyle = _.get(children, 'props.style')
    const type = TRANSITION_STYLE_TYPE[status]
    const animationDuration = type && `${normalizeTransitionDuration(duration, type)}ms`
    return { ...childStyle, animationDuration }
  }
  render() {
    debug('render(): props', this.props)
    debug('render(): state', this.state)
    const { children } = this.props
    const { nextStatus, status } = this.state
    if (status === TRANSITION_STATUS_UNMOUNTED) {
      return null
    }
    return React.cloneElement(children, {
      className: this.computeClasses(),
      style: this.computeStyle(),
      ...(process.env.NODE_ENV !== 'production' && {
        'data-test-status': status,
        'data-test-next-status': nextStatus,
      }),
    })
  }
}
Transition.propTypes = {
  animation: PropTypes.oneOfType([PropTypes.oneOf(SUI.TRANSITIONS), PropTypes.string]),
  children: PropTypes.element.isRequired,
  directional: PropTypes.bool,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      hide: PropTypes.number,
      show: PropTypes.number,
    }),
    PropTypes.string,
  ]),
  visible: PropTypes.bool,
  mountOnShow: PropTypes.bool,
  onComplete: PropTypes.func,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  onStart: PropTypes.func,
  reactKey: PropTypes.string,
  transitionOnMount: PropTypes.bool,
  unmountOnHide: PropTypes.bool,
}
Transition.defaultProps = {
  animation: 'fade',
  duration: 500,
  visible: true,
  mountOnShow: true,
  transitionOnMount: false,
  unmountOnHide: false,
}
````

## File: modules/Transition/TransitionGroup.d.ts/TransitionGroup.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticTRANSITIONS } from '../../generic'
import { TransitionPropDuration } from './Transition'
export interface TransitionGroupProps extends StrictTransitionGroupProps {
  [key: string]: any
}
export interface StrictTransitionGroupProps {
  as?: any
  animation?: SemanticTRANSITIONS | string
  children?: React.ReactNode
  directional?: boolean
  duration?: number | string | TransitionPropDuration
}
declare const TransitionGroup: ForwardRefComponent<TransitionGroupProps, HTMLDivElement>
export default TransitionGroup
````

## File: modules/Transition/TransitionGroup.js/TransitionGroup.js
````javascript
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  getComponentType,
  getUnhandledProps,
  makeDebugger,
  SUI,
  useEventCallback,
  useForceUpdate,
} from '../../lib'
import { getChildMapping, mergeChildMappings } from './utils/childMapping'
import wrapChild from './utils/wrapChild'
const debug = makeDebugger('transition_group')
function useWrappedChildren(children, animation, duration, directional) {
  debug('wrapChildren()')
  const forceUpdate = useForceUpdate()
  const previousChildren = React.useRef()
  let wrappedChildren
  React.useEffect(() => {
    previousChildren.current = wrappedChildren
  })
  const handleChildHide = useEventCallback((nothing, childProps) => {
    debug('handleOnHide', childProps)
    const { reactKey } = childProps
    delete previousChildren.current[reactKey]
    forceUpdate()
  })
  if (typeof previousChildren.current === 'undefined') {
    wrappedChildren = _.mapValues(getChildMapping(children), (child) =>
      wrapChild(child, handleChildHide, {
        animation,
        duration,
        directional,
      }),
    )
  } else {
    const nextMapping = getChildMapping(children)
    wrappedChildren = mergeChildMappings(previousChildren.current, nextMapping)
    _.forEach(wrappedChildren, (child, key) => {
      const hasPrev = previousChildren.current[key]
      const hasNext = nextMapping[key]
      const prevChild = previousChildren.current[key]
      const isLeaving = !_.get(prevChild, 'props.visible')
      if (hasNext && (!hasPrev || isLeaving)) {
        wrappedChildren[key] = wrapChild(child, handleChildHide, {
          animation,
          duration,
          directional,
          transitionOnMount: true,
        })
        return
      }
      if (!hasNext && hasPrev && !isLeaving) {
        wrappedChildren[key] = React.cloneElement(prevChild, { visible: false })
        return
      }
      const {
        props: { visible, transitionOnMount },
      } = prevChild
      wrappedChildren[key] = wrapChild(child, handleChildHide, {
        animation,
        duration,
        directional,
        transitionOnMount,
        visible,
      })
    })
  }
  return wrappedChildren
}
const TransitionGroup = React.forwardRef(function (props, ref) {
  debug('render')
  debug('props', props)
  const children = useWrappedChildren(
    props.children,
    props.animation ?? 'fade',
    props.duration ?? 500,
    props.directional,
  )
  const ElementType = getComponentType(props, { defaultAs: React.Fragment })
  const rest = getUnhandledProps(TransitionGroup, props)
  return (
    <ElementType {...rest} ref={ref}>
      {_.values(children)}
    </ElementType>
  )
})
TransitionGroup.displayName = 'TransitionGroup'
TransitionGroup.propTypes = {
  as: PropTypes.elementType,
  animation: PropTypes.oneOfType([PropTypes.oneOf(SUI.TRANSITIONS), PropTypes.string]),
  children: PropTypes.node,
  directional: PropTypes.bool,
  duration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      hide: PropTypes.number.isRequired,
      show: PropTypes.number.isRequired,
    }),
    PropTypes.string,
  ]),
}
export default TransitionGroup
````

## File: modules/Transition/utils/childMapping.js/childMapping.js
````javascript
import _ from 'lodash'
import { Children, isValidElement } from 'react'
export const getChildMapping = (children) =>
  _.keyBy(_.filter(Children.toArray(children), isValidElement), 'key')
const getPendingKeys = (prev, next) => {
  const nextKeysPending = {}
  let pendingKeys = []
  _.forEach(_.keys(prev), (prevKey) => {
    if (!_.has(next, prevKey)) {
      pendingKeys.push(prevKey)
      return
    }
    if (pendingKeys.length) {
      nextKeysPending[prevKey] = pendingKeys
      pendingKeys = []
    }
  })
  return [nextKeysPending, pendingKeys]
}
const getValue = (key, prev, next) => (_.has(next, key) ? next[key] : prev[key])
export const mergeChildMappings = (prev = {}, next = {}) => {
  const childMapping = {}
  const [nextKeysPending, pendingKeys] = getPendingKeys(prev, next)
  _.forEach(_.keys(next), (nextKey) => {
    if (_.has(nextKeysPending, nextKey)) {
      _.forEach(nextKeysPending[nextKey], (pendingKey) => {
        childMapping[pendingKey] = getValue(pendingKey, prev, next)
      })
    }
    childMapping[nextKey] = getValue(nextKey, prev, next)
  })
  _.forEach(pendingKeys, (pendingKey) => {
    childMapping[pendingKey] = getValue(pendingKey, prev, next)
  })
  return childMapping
}
````

## File: modules/Transition/utils/computeStatuses.js/computeStatuses.js
````javascript
export const TRANSITION_STATUS_INITIAL = 'INITIAL'
export const TRANSITION_STATUS_ENTERED = 'ENTERED'
export const TRANSITION_STATUS_ENTERING = 'ENTERING'
export const TRANSITION_STATUS_EXITED = 'EXITED'
export const TRANSITION_STATUS_EXITING = 'EXITING'
export const TRANSITION_STATUS_UNMOUNTED = 'UNMOUNTED'
export function computeStatuses(options) {
  const { mountOnShow, status, transitionOnMount, visible, unmountOnHide } = options
  if (visible) {
    if (status === TRANSITION_STATUS_INITIAL) {
      if (transitionOnMount) {
        return {
          animating: true,
          status: TRANSITION_STATUS_ENTERING,
          nextStatus: TRANSITION_STATUS_ENTERED,
        }
      }
      return {
        animating: false,
        status: TRANSITION_STATUS_ENTERED,
        nextStatus: undefined,
      }
    }
    if (status === TRANSITION_STATUS_UNMOUNTED) {
      return {
        animating: true,
        status: TRANSITION_STATUS_ENTERING,
        nextStatus: TRANSITION_STATUS_ENTERED,
      }
    }
    if (status === TRANSITION_STATUS_EXITED || status === TRANSITION_STATUS_EXITING) {
      return {
        animating: true,
        status: TRANSITION_STATUS_ENTERING,
        nextStatus: TRANSITION_STATUS_ENTERED,
      }
    }
    if (status === TRANSITION_STATUS_ENTERING) {
      return {}
    }
    if (status === TRANSITION_STATUS_ENTERED) {
      return {
        animating: false,
        status: TRANSITION_STATUS_ENTERED,
        nextStatus: undefined,
      }
    }
  }
  if (status === TRANSITION_STATUS_INITIAL) {
    if (mountOnShow || unmountOnHide) {
      return {
        animating: false,
        status: TRANSITION_STATUS_UNMOUNTED,
        nextStatus: undefined,
      }
    }
    return {
      animating: false,
      status: TRANSITION_STATUS_EXITED,
      nextStatus: undefined,
    }
  }
  if (status === TRANSITION_STATUS_ENTERED || status === TRANSITION_STATUS_ENTERING) {
    return {
      animating: true,
      status: TRANSITION_STATUS_EXITING,
      nextStatus: unmountOnHide ? TRANSITION_STATUS_UNMOUNTED : TRANSITION_STATUS_EXITED,
    }
  }
  if (status === TRANSITION_STATUS_EXITING) {
    return {}
  }
  if (status === TRANSITION_STATUS_EXITED) {
    return {
      animating: false,
      status: TRANSITION_STATUS_EXITED,
      nextStatus: undefined,
    }
  }
  if (status === TRANSITION_STATUS_UNMOUNTED) {
    return {
      animating: false,
      status: TRANSITION_STATUS_UNMOUNTED,
      nextStatus: undefined,
    }
  }
  throw new Error(
    `Transition:computeStatuses(): an unexpected status transition: { visible: ${visible}, status: ${status} }`,
  )
}
````

## File: modules/Transition/utils/wrapChild.js/wrapChild.js
````javascript
import * as React from 'react'
import Transition from '../Transition'
export default function wrapChild(child, onHide, options = {}) {
  const { key } = child
  const { animation, directional, duration, transitionOnMount = false, visible = true } = options
  return (
    <Transition
      animation={animation}
      directional={directional}
      duration={duration}
      key={key}
      onHide={onHide}
      reactKey={key}
      transitionOnMount={transitionOnMount}
      visible={visible}
    >
      {child}
    </Transition>
  )
}
````

## File: umd.js/umd.js
````javascript
export * from './index'
````

## File: views/Advertisement/Advertisement.d.ts/Advertisement.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface AdvertisementProps extends StrictAdvertisementProps {
  [key: string]: any
}
export interface StrictAdvertisementProps {
  as?: any
  centered?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  test?: boolean | string | number
  unit:
    | 'medium rectangle'
    | 'large rectangle'
    | 'vertical rectangle'
    | 'small rectangle'
    | 'mobile banner'
    | 'banner'
    | 'vertical banner'
    | 'top banner'
    | 'half banner'
    | 'button'
    | 'square button'
    | 'small button'
    | 'skyscraper'
    | 'wide skyscraper'
    | 'leaderboard'
    | 'large leaderboard'
    | 'mobile leaderboard'
    | 'billboard'
    | 'panorama'
    | 'netboard'
    | 'half page'
    | 'square'
    | 'small square'
}
declare const Advertisement: ForwardRefComponent<AdvertisementProps, HTMLDivElement>
export default Advertisement
````

## File: views/Advertisement/Advertisement.js/Advertisement.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const Advertisement = React.forwardRef(function (props, ref) {
  const { centered, children, className, content, test, unit } = props
  const classes = cx(
    'ui',
    unit,
    getKeyOnly(centered, 'centered'),
    getKeyOnly(test, 'test'),
    'ad',
    className,
  )
  const rest = getUnhandledProps(Advertisement, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} data-text={test} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Advertisement.displayName = 'Advertisement'
Advertisement.propTypes = {
  as: PropTypes.elementType,
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  test: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
  unit: PropTypes.oneOf([
    'medium rectangle',
    'large rectangle',
    'vertical rectangle',
    'small rectangle',
    'mobile banner',
    'banner',
    'vertical banner',
    'top banner',
    'half banner',
    'button',
    'square button',
    'small button',
    'skyscraper',
    'wide skyscraper',
    'leaderboard',
    'large leaderboard',
    'mobile leaderboard',
    'billboard',
    'panorama',
    'netboard',
    'half page',
    'square',
    'small square',
  ]).isRequired,
}
export default Advertisement
````

## File: views/Advertisement/index.d.ts/index.d.ts
````typescript
export { default, AdvertisementProps, StrictAdvertisementProps } from './Advertisement'
````

## File: views/Advertisement/index.js/index.js
````javascript
export default from './Advertisement'
````

## File: views/Card/Card.d.ts/Card.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { ImageProps } from '../../elements/Image'
import CardContent from './CardContent'
import CardDescription, { CardDescriptionProps } from './CardDescription'
import CardGroup from './CardGroup'
import CardHeader, { CardHeaderProps } from './CardHeader'
import CardMeta, { CardMetaProps } from './CardMeta'
export interface CardProps extends StrictCardProps {
  [key: string]: any
}
export interface StrictCardProps {
  as?: any
  centered?: boolean
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<CardDescriptionProps>
  extra?: SemanticShorthandContent
  fluid?: boolean
  header?: SemanticShorthandItem<CardHeaderProps>
  href?: string
  image?: SemanticShorthandItem<ImageProps>
  link?: boolean
  meta?: SemanticShorthandItem<CardMetaProps>
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>, data: CardProps) => void
  raised?: boolean
}
declare const Card: ForwardRefComponent<CardProps, HTMLDivElement> & {
  Content: typeof CardContent
  Description: typeof CardDescription
  Group: typeof CardGroup
  Header: typeof CardHeader
  Meta: typeof CardMeta
}
export default Card
````

## File: views/Card/Card.js/Card.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
import Image from '../../elements/Image'
import CardContent from './CardContent'
import CardDescription from './CardDescription'
import CardGroup from './CardGroup'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'
const Card = React.forwardRef(function (props, ref) {
  const {
    centered,
    children,
    className,
    color,
    content,
    description,
    extra,
    fluid,
    header,
    href,
    image,
    link,
    meta,
    onClick,
    raised,
  } = props
  const classes = cx(
    'ui',
    color,
    getKeyOnly(centered, 'centered'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(link, 'link'),
    getKeyOnly(raised, 'raised'),
    'card',
    className,
  )
  const rest = getUnhandledProps(Card, props)
  const ElementType = getComponentType(props, {
    getDefault: () => {
      if (onClick) {
        return 'a'
      }
    },
  })
  const handleClick = useEventCallback((e) => {
    _.invoke(props, 'onClick', e, props)
  })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
      {Image.create(image, {
        autoGenerateKey: false,
        defaultProps: {
          ui: false,
          wrapped: true,
        },
      })}
      {(description || header || meta) && (
        <CardContent description={description} header={header} meta={meta} />
      )}
      {extra && <CardContent extra>{extra}</CardContent>}
    </ElementType>
  )
})
Card.displayName = 'Card'
Card.propTypes = {
  as: PropTypes.elementType,
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  extra: customPropTypes.contentShorthand,
  fluid: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  href: PropTypes.string,
  image: customPropTypes.itemShorthand,
  link: PropTypes.bool,
  meta: customPropTypes.itemShorthand,
  onClick: PropTypes.func,
  raised: PropTypes.bool,
}
Card.Content = CardContent
Card.Description = CardDescription
Card.Group = CardGroup
Card.Header = CardHeader
Card.Meta = CardMeta
export default Card
````

## File: views/Card/CardContent.d.ts/CardContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { CardDescriptionProps } from './CardDescription'
import { CardHeaderProps } from './CardHeader'
import { CardMetaProps } from './CardMeta'
export interface CardContentProps extends StrictCardContentProps {
  [key: string]: any
}
export interface StrictCardContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<CardDescriptionProps>
  extra?: boolean
  header?: SemanticShorthandItem<CardHeaderProps>
  meta?: SemanticShorthandItem<CardMetaProps>
  textAlign?: 'center' | 'left' | 'right'
}
declare const CardContent: ForwardRefComponent<CardContentProps, HTMLDivElement>
export default CardContent
````

## File: views/Card/CardContent.js/CardContent.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
} from '../../lib'
import CardDescription from './CardDescription'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'
const CardContent = React.forwardRef(function (props, ref) {
  const { children, className, content, description, extra, header, meta, textAlign } = props
  const classes = cx(getKeyOnly(extra, 'extra'), getTextAlignProp(textAlign), 'content', className)
  const rest = getUnhandledProps(CardContent, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {createShorthand(CardHeader, (val) => ({ content: val }), header, { autoGenerateKey: false })}
      {createShorthand(CardMeta, (val) => ({ content: val }), meta, { autoGenerateKey: false })}
      {createShorthand(CardDescription, (val) => ({ content: val }), description, {
        autoGenerateKey: false,
      })}
    </ElementType>
  )
})
CardContent.displayName = 'CardContent'
CardContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  extra: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  meta: customPropTypes.itemShorthand,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}
export default CardContent
````

## File: views/Card/CardDescription.d.ts/CardDescription.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CardDescriptionProps extends StrictCardDescriptionProps {
  [key: string]: any
}
export interface StrictCardDescriptionProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  textAlign?: 'center' | 'left' | 'right'
}
declare const CardDescription: ForwardRefComponent<CardDescriptionProps, HTMLDivElement>
export default CardDescription
````

## File: views/Card/CardDescription.js/CardDescription.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getTextAlignProp,
} from '../../lib'
const CardDescription = React.forwardRef(function (props, ref) {
  const { children, className, content, textAlign } = props
  const classes = cx(getTextAlignProp(textAlign), 'description', className)
  const rest = getUnhandledProps(CardDescription, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CardDescription.displayName = 'CardDescription'
CardDescription.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}
export default CardDescription
````

## File: views/Card/CardGroup.d.ts/CardGroup.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticWIDTHS,
} from '../../generic'
import { CardProps } from './Card'
export interface CardGroupProps extends StrictCardGroupProps {
  [key: string]: any
}
export interface StrictCardGroupProps {
  as?: any
  centered?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  doubling?: boolean
  items?: SemanticShorthandCollection<CardProps>
  itemsPerRow?: SemanticWIDTHS
  stackable?: boolean
  textAlign?: 'center' | 'left' | 'right'
}
declare const CardGroup: ForwardRefComponent<CardGroupProps, HTMLDivElement>
export default CardGroup
````

## File: views/Card/CardGroup.js/CardGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getTextAlignProp,
  getWidthProp,
} from '../../lib'
import Card from './Card'
const CardGroup = React.forwardRef(function (props, ref) {
  const {
    centered,
    children,
    className,
    content,
    doubling,
    items,
    itemsPerRow,
    stackable,
    textAlign,
  } = props
  const classes = cx(
    'ui',
    getKeyOnly(centered, 'centered'),
    getKeyOnly(doubling, 'doubling'),
    getKeyOnly(stackable, 'stackable'),
    getTextAlignProp(textAlign),
    getWidthProp(itemsPerRow),
    'cards',
    className,
  )
  const rest = getUnhandledProps(CardGroup, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  const itemsJSX = _.map(items, (item) => {
    const key = item.key ?? [item.header, item.description].join('-')
    return <Card key={key} {...item} />
  })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {itemsJSX}
    </ElementType>
  )
})
CardGroup.displayName = 'CardGroup'
CardGroup.propTypes = {
  as: PropTypes.elementType,
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  doubling: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  itemsPerRow: PropTypes.oneOf(SUI.WIDTHS),
  stackable: PropTypes.bool,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}
export default CardGroup
````

## File: views/Card/CardHeader.d.ts/CardHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CardHeaderProps extends StrictCardHeaderProps {
  [key: string]: any
}
export interface StrictCardHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  textAlign?: 'center' | 'left' | 'right'
}
declare const CardHeader: ForwardRefComponent<CardHeaderProps, HTMLDivElement>
export default CardHeader
````

## File: views/Card/CardHeader.js/CardHeader.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getTextAlignProp,
} from '../../lib'
const CardHeader = React.forwardRef(function (props, ref) {
  const { children, className, content, textAlign } = props
  const classes = cx(getTextAlignProp(textAlign), 'header', className)
  const rest = getUnhandledProps(CardHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CardHeader.displayName = 'CardHeader'
CardHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}
export default CardHeader
````

## File: views/Card/CardMeta.d.ts/CardMeta.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CardMetaProps extends StrictCardMetaProps {
  [key: string]: any
}
export interface StrictCardMetaProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  textAlign?: 'center' | 'left' | 'right'
}
declare const CardMeta: ForwardRefComponent<CardMetaProps, HTMLDivElement>
export default CardMeta
````

## File: views/Card/CardMeta.js/CardMeta.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getTextAlignProp,
} from '../../lib'
const CardMeta = React.forwardRef(function (props, ref) {
  const { children, className, content, textAlign } = props
  const classes = cx(getTextAlignProp(textAlign), 'meta', className)
  const rest = getUnhandledProps(CardMeta, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CardMeta.displayName = 'CardMeta'
CardMeta.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  textAlign: PropTypes.oneOf(_.without(SUI.TEXT_ALIGNMENTS, 'justified')),
}
export default CardMeta
````

## File: views/Card/index.d.ts/index.d.ts
````typescript
export { default, CardProps, StrictCardProps } from './Card'
````

## File: views/Card/index.js/index.js
````javascript
export default from './Card'
````

## File: views/Comment/Comment.d.ts/Comment.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
import CommentAction from './CommentAction'
import CommentActions from './CommentActions'
import CommentAuthor from './CommentAuthor'
import CommentAvatar from './CommentAvatar'
import CommentContent from './CommentContent'
import CommentGroup from './CommentGroup'
import CommentMetadata from './CommentMetadata'
import CommentText from './CommentText'
export interface CommentProps extends StrictCommentProps {
  [key: string]: any
}
export interface StrictCommentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  collapsed?: boolean
  content?: SemanticShorthandContent
}
declare const Comment: ForwardRefComponent<CommentProps, HTMLDivElement> & {
  Action: typeof CommentAction
  Actions: typeof CommentActions
  Author: typeof CommentAuthor
  Avatar: typeof CommentAvatar
  Content: typeof CommentContent
  Group: typeof CommentGroup
  Metadata: typeof CommentMetadata
  Text: typeof CommentText
}
export default Comment
````

## File: views/Comment/Comment.js/Comment.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import CommentAction from './CommentAction'
import CommentActions from './CommentActions'
import CommentAuthor from './CommentAuthor'
import CommentAvatar from './CommentAvatar'
import CommentContent from './CommentContent'
import CommentGroup from './CommentGroup'
import CommentMetadata from './CommentMetadata'
import CommentText from './CommentText'
const Comment = React.forwardRef(function (props, ref) {
  const { className, children, collapsed, content } = props
  const classes = cx(getKeyOnly(collapsed, 'collapsed'), 'comment', className)
  const rest = getUnhandledProps(Comment, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
Comment.displayName = 'Comment'
Comment.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  content: customPropTypes.contentShorthand,
}
Comment.Author = CommentAuthor
Comment.Action = CommentAction
Comment.Actions = CommentActions
Comment.Avatar = CommentAvatar
Comment.Content = CommentContent
Comment.Group = CommentGroup
Comment.Metadata = CommentMetadata
Comment.Text = CommentText
export default Comment
````

## File: views/Comment/CommentAction.d.ts/CommentAction.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentActionProps extends StrictCommentActionProps {
  [key: string]: any
}
export interface StrictCommentActionProps {
  as?: any
  active?: boolean
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const CommentAction: ForwardRefComponent<CommentActionProps, HTMLDivElement>
export default CommentAction
````

## File: views/Comment/CommentAction.js/CommentAction.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const CommentAction = React.forwardRef(function (props, ref) {
  const { active, className, children, content } = props
  const classes = cx(getKeyOnly(active, 'active'), className)
  const rest = getUnhandledProps(CommentAction, props)
  const ElementType = getComponentType(props, { defaultAs: 'a' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentAction.displayName = 'CommentAction'
CommentAction.propTypes = {
  as: PropTypes.elementType,
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default CommentAction
````

## File: views/Comment/CommentActions.d.ts/CommentActions.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentActionsProps extends StrictCommentActionsProps {
  [key: string]: any
}
export interface StrictCommentActionsProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const CommentActions: ForwardRefComponent<CommentActionsProps, HTMLDivElement>
export default CommentActions
````

## File: views/Comment/CommentActions.js/CommentActions.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const CommentActions = React.forwardRef(function (props, ref) {
  const { className, children, content } = props
  const classes = cx('actions', className)
  const rest = getUnhandledProps(CommentActions, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentActions.displayName = 'CommentActions'
CommentActions.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default CommentActions
````

## File: views/Comment/CommentAuthor.d.ts/CommentAuthor.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentAuthorProps extends StrictCommentAuthorProps {
  [key: string]: any
}
export interface StrictCommentAuthorProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const CommentAuthor: ForwardRefComponent<CommentAuthorProps, HTMLDivElement>
export default CommentAuthor
````

## File: views/Comment/CommentAuthor.js/CommentAuthor.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const CommentAuthor = React.forwardRef(function (props, ref) {
  const { className, children, content } = props
  const classes = cx('author', className)
  const rest = getUnhandledProps(CommentAuthor, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentAuthor.displayName = 'CommentAuthor'
CommentAuthor.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default CommentAuthor
````

## File: views/Comment/CommentAvatar.d.ts/CommentAvatar.d.ts
````typescript
import { ForwardRefComponent } from '../../generic'
export interface CommentAvatarProps extends StrictCommentAvatarProps {
  [key: string]: any
}
export interface StrictCommentAvatarProps {
  as?: any
  className?: string
  src?: string
}
declare const CommentAvatar: ForwardRefComponent<CommentAvatarProps, HTMLDivElement>
export default CommentAvatar
````

## File: views/Comment/CommentAvatar.js/CommentAvatar.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  createHTMLImage,
  getComponentType,
  getUnhandledProps,
  htmlImageProps,
  partitionHTMLProps,
} from '../../lib'
const CommentAvatar = React.forwardRef(function (props, ref) {
  const { className, src } = props
  const classes = cx('avatar', className)
  const rest = getUnhandledProps(CommentAvatar, props)
  const [imageProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps })
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rootProps} className={classes} ref={ref}>
      {createHTMLImage(src, { autoGenerateKey: false, defaultProps: imageProps })}
    </ElementType>
  )
})
CommentAvatar.displayName = 'CommentAvatar'
CommentAvatar.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  src: PropTypes.string,
}
export default CommentAvatar
````

## File: views/Comment/CommentContent.d.ts/CommentContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentContentProps extends StrictCommentContentProps {
  [key: string]: any
}
export interface StrictCommentContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const CommentContent: ForwardRefComponent<CommentContentProps, HTMLDivElement>
export default CommentContent
````

## File: views/Comment/CommentContent.js/CommentContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const CommentContent = React.forwardRef(function (props, ref) {
  const { className, children, content } = props
  const classes = cx(className, 'content')
  const rest = getUnhandledProps(CommentContent, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentContent.displayName = 'CommentContent'
CommentContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default CommentContent
````

## File: views/Comment/CommentGroup.d.ts/CommentGroup.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentGroupProps extends StrictCommentGroupProps {
  [key: string]: any
}
export interface StrictCommentGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  collapsed?: boolean
  content?: SemanticShorthandContent
  minimal?: boolean
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive'
  threaded?: boolean
}
declare const CommentGroup: ForwardRefComponent<CommentGroupProps, HTMLDivElement>
export default CommentGroup
````

## File: views/Comment/CommentGroup.js/CommentGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
} from '../../lib'
const CommentGroup = React.forwardRef(function (props, ref) {
  const { className, children, collapsed, content, minimal, size, threaded } = props
  const classes = cx(
    'ui',
    size,
    getKeyOnly(collapsed, 'collapsed'),
    getKeyOnly(minimal, 'minimal'),
    getKeyOnly(threaded, 'threaded'),
    'comments',
    className,
  )
  const rest = getUnhandledProps(CommentGroup, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentGroup.displayName = 'CommentGroup'
CommentGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  content: customPropTypes.contentShorthand,
  minimal: PropTypes.bool,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'medium')),
  threaded: PropTypes.bool,
}
export default CommentGroup
````

## File: views/Comment/CommentMetadata.d.ts/CommentMetadata.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentMetadataProps extends StrictCommentMetadataProps {
  [key: string]: any
}
export interface StrictCommentMetadataProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const CommentMetadata: ForwardRefComponent<CommentMetadataProps, HTMLDivElement>
export default CommentMetadata
````

## File: views/Comment/CommentMetadata.js/CommentMetadata.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const CommentMetadata = React.forwardRef(function (props, ref) {
  const { className, children, content } = props
  const classes = cx('metadata', className)
  const rest = getUnhandledProps(CommentMetadata, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentMetadata.displayName = 'CommentMetadata'
CommentMetadata.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default CommentMetadata
````

## File: views/Comment/CommentText.d.ts/CommentText.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface CommentTextProps extends StrictCommentTextProps {
  [key: string]: any
}
export interface StrictCommentTextProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const CommentText: ForwardRefComponent<CommentTextProps, HTMLDivElement>
export default CommentText
````

## File: views/Comment/CommentText.js/CommentText.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const CommentText = React.forwardRef(function (props, ref) {
  const { className, children, content } = props
  const classes = cx(className, 'text')
  const rest = getUnhandledProps(CommentText, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
CommentText.displayName = 'CommentText'
CommentText.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default CommentText
````

## File: views/Comment/index.d.ts/index.d.ts
````typescript
export { default, CommentProps, StrictCommentProps } from './Comment'
````

## File: views/Comment/index.js/index.js
````javascript
export default from './Comment'
````

## File: views/Feed/Feed.d.ts/Feed.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandCollection } from '../../generic'
import FeedContent from './FeedContent'
import FeedDate from './FeedDate'
import FeedEvent, { FeedEventProps } from './FeedEvent'
import FeedExtra from './FeedExtra'
import FeedLabel from './FeedLabel'
import FeedMeta from './FeedMeta'
import FeedLike from './FeedLike'
import FeedSummary from './FeedSummary'
import FeedUser from './FeedUser'
export interface FeedProps extends StrictFeedProps {
  [key: string]: any
}
export interface StrictFeedProps {
  as?: any
  children?: React.ReactNode
  className?: string
  events?: SemanticShorthandCollection<FeedEventProps>
  size?: 'small' | 'large'
}
declare const Feed: ForwardRefComponent<FeedProps, HTMLDivElement> & {
  Content: typeof FeedContent
  Date: typeof FeedDate
  Event: typeof FeedEvent
  Extra: typeof FeedExtra
  Label: typeof FeedLabel
  Meta: typeof FeedMeta
  Like: typeof FeedLike
  Summary: typeof FeedSummary
  User: typeof FeedUser
}
export default Feed
````

## File: views/Feed/Feed.js/Feed.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps, SUI } from '../../lib'
import FeedContent from './FeedContent'
import FeedDate from './FeedDate'
import FeedEvent from './FeedEvent'
import FeedExtra from './FeedExtra'
import FeedLabel from './FeedLabel'
import FeedLike from './FeedLike'
import FeedMeta from './FeedMeta'
import FeedSummary from './FeedSummary'
import FeedUser from './FeedUser'
const Feed = React.forwardRef(function (props, ref) {
  const { children, className, events, size } = props
  const classes = cx('ui', size, 'feed', className)
  const rest = getUnhandledProps(Feed, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const eventElements = _.map(events, (eventProps) => {
    const { childKey, date, meta, summary, ...eventData } = eventProps
    const finalKey = childKey ?? [date, meta, summary].join('-')
    return <FeedEvent date={date} key={finalKey} meta={meta} summary={summary} {...eventData} />
  })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {eventElements}
    </ElementType>
  )
})
Feed.displayName = 'Feed'
Feed.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  events: customPropTypes.collectionShorthand,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')),
}
Feed.Content = FeedContent
Feed.Date = FeedDate
Feed.Event = FeedEvent
Feed.Extra = FeedExtra
Feed.Label = FeedLabel
Feed.Like = FeedLike
Feed.Meta = FeedMeta
Feed.Summary = FeedSummary
Feed.User = FeedUser
export default Feed
````

## File: views/Feed/FeedContent.d.ts/FeedContent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { FeedDateProps } from './FeedDate'
import { FeedExtraProps } from './FeedExtra'
import { FeedMetaProps } from './FeedMeta'
import { FeedSummaryProps } from './FeedSummary'
export interface FeedContentProps extends StrictFeedContentProps {
  [key: string]: any
}
export interface StrictFeedContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  date?: SemanticShorthandItem<FeedDateProps>
  extraImages?: SemanticShorthandItem<FeedExtraProps>
  extraText?: SemanticShorthandItem<FeedExtraProps>
  meta?: SemanticShorthandItem<FeedMetaProps>
  summary?: SemanticShorthandItem<FeedSummaryProps>
}
declare const FeedContent: ForwardRefComponent<FeedContentProps, HTMLDivElement>
export default FeedContent
````

## File: views/Feed/FeedContent.js/FeedContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import FeedDate from './FeedDate'
import FeedExtra from './FeedExtra'
import FeedMeta from './FeedMeta'
import FeedSummary from './FeedSummary'
const FeedContent = React.forwardRef(function (props, ref) {
  const { children, className, content, extraImages, extraText, date, meta, summary } = props
  const classes = cx('content', className)
  const rest = getUnhandledProps(FeedContent, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {createShorthand(FeedDate, (val) => ({ content: val }), date, { autoGenerateKey: false })}
      {createShorthand(FeedSummary, (val) => ({ content: val }), summary, {
        autoGenerateKey: false,
      })}
      {content}
      {createShorthand(FeedExtra, (val) => ({ text: true, content: val }), extraText, {
        autoGenerateKey: false,
      })}
      {createShorthand(FeedExtra, (val) => ({ images: val }), extraImages, {
        autoGenerateKey: false,
      })}
      {createShorthand(FeedMeta, (val) => ({ content: val }), meta, { autoGenerateKey: false })}
    </ElementType>
  )
})
FeedContent.displayName = 'FeedContent'
FeedContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  date: customPropTypes.itemShorthand,
  extraImages: FeedExtra.propTypes.images,
  extraText: customPropTypes.itemShorthand,
  meta: customPropTypes.itemShorthand,
  summary: customPropTypes.itemShorthand,
}
export default FeedContent
````

## File: views/Feed/FeedDate.d.ts/FeedDate.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface FeedDateProps extends StrictFeedDateProps {
  [key: string]: any
}
export interface StrictFeedDateProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const FeedDate: ForwardRefComponent<FeedDateProps, HTMLDivElement>
export default FeedDate
````

## File: views/Feed/FeedDate.js/FeedDate.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const FeedDate = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('date', className)
  const rest = getUnhandledProps(FeedDate, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
FeedDate.displayName = 'FeedDate'
FeedDate.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default FeedDate
````

## File: views/Feed/FeedEvent.d.ts/FeedEvent.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandItem } from '../../generic'
import { FeedContentProps } from './FeedContent'
import { FeedDateProps } from './FeedDate'
import { FeedLabelProps } from './FeedLabel'
import { FeedMetaProps } from './FeedMeta'
import { FeedSummaryProps } from './FeedSummary'
import { FeedExtraProps } from './FeedExtra'
export interface FeedEventProps extends StrictFeedEventProps {
  [key: string]: any
}
export interface StrictFeedEventProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandItem<FeedContentProps>
  date?: SemanticShorthandItem<FeedDateProps>
  extraImages?: SemanticShorthandItem<FeedExtraProps>
  extraText?: SemanticShorthandItem<FeedExtraProps>
  icon?: SemanticShorthandItem<FeedLabelProps>
  image?: SemanticShorthandItem<FeedLabelProps>
  meta?: SemanticShorthandItem<FeedMetaProps>
  summary?: SemanticShorthandItem<FeedSummaryProps>
}
declare const FeedEvent: ForwardRefComponent<FeedEventProps, HTMLDivElement>
export default FeedEvent
````

## File: views/Feed/FeedEvent.js/FeedEvent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { createShorthand, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
import FeedContent from './FeedContent'
import FeedLabel from './FeedLabel'
const FeedEvent = React.forwardRef(function (props, ref) {
  const {
    content,
    children,
    className,
    date,
    extraImages,
    extraText,
    image,
    icon,
    meta,
    summary,
  } = props
  const classes = cx('event', className)
  const rest = getUnhandledProps(FeedEvent, props)
  const ElementType = getComponentType(props)
  const hasContentProp = content || date || extraImages || extraText || meta || summary
  const contentProps = { content, date, extraImages, extraText, meta, summary }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {createShorthand(FeedLabel, (val) => ({ icon: val }), icon, { autoGenerateKey: false })}
      {createShorthand(FeedLabel, (val) => ({ image: val }), image, { autoGenerateKey: false })}
      {hasContentProp && <FeedContent {...contentProps} />}
      {children}
    </ElementType>
  )
})
FeedEvent.displayName = 'FeedEvent'
FeedEvent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.itemShorthand,
  date: customPropTypes.itemShorthand,
  extraImages: customPropTypes.itemShorthand,
  extraText: customPropTypes.itemShorthand,
  icon: customPropTypes.itemShorthand,
  image: customPropTypes.itemShorthand,
  meta: customPropTypes.itemShorthand,
  summary: customPropTypes.itemShorthand,
}
export default FeedEvent
````

## File: views/Feed/FeedExtra.d.ts/FeedExtra.d.ts
````typescript
import * as React from 'react'
import {
  HtmlImageProps,
  SemanticShorthandContent,
  SemanticShorthandCollection,
  ForwardRefComponent,
} from '../../generic'
export interface FeedExtraProps extends StrictFeedExtraProps {
  [key: string]: any
}
export interface StrictFeedExtraProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  images?: boolean | SemanticShorthandCollection<HtmlImageProps>[]
  text?: boolean
}
declare const FeedExtra: ForwardRefComponent<FeedExtraProps, HTMLDivElement>
export default FeedExtra
````

## File: views/Feed/FeedExtra.js/FeedExtra.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createHTMLImage,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const FeedExtra = React.forwardRef(function (props, ref) {
  const { children, className, content, images, text } = props
  const classes = cx(
    getKeyOnly(images, 'images'),
    getKeyOnly(content || text, 'text'),
    'extra',
    className,
  )
  const rest = getUnhandledProps(FeedExtra, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  const imageElements = _.map(images, (image, index) => {
    const key = [index, image].join('-')
    return createHTMLImage(image, { key })
  })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {content}
      {imageElements}
    </ElementType>
  )
})
FeedExtra.displayName = 'FeedExtra'
FeedExtra.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  images: customPropTypes.every([
    customPropTypes.disallow(['text']),
    PropTypes.oneOfType([PropTypes.bool, customPropTypes.collectionShorthand]),
  ]),
  text: PropTypes.bool,
}
export default FeedExtra
````

## File: views/Feed/FeedLabel.d.ts/FeedLabel.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  HtmlImageProps,
  SemanticShorthandContent,
  SemanticShorthandItem,
} from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface FeedLabelProps extends StrictFeedLabelProps {
  [key: string]: any
}
export interface StrictFeedLabelProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  icon?: SemanticShorthandItem<IconProps>
  image?: SemanticShorthandItem<HtmlImageProps>
}
declare const FeedLabel: ForwardRefComponent<FeedLabelProps, HTMLDivElement>
export default FeedLabel
````

## File: views/Feed/FeedLabel.js/FeedLabel.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createHTMLImage,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import Icon from '../../elements/Icon'
const FeedLabel = React.forwardRef(function (props, ref) {
  const { children, className, content, icon, image } = props
  const classes = cx('label', className)
  const rest = getUnhandledProps(FeedLabel, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {content}
      {Icon.create(icon, { autoGenerateKey: false })}
      {createHTMLImage(image)}
    </ElementType>
  )
})
FeedLabel.displayName = 'FeedLabel'
FeedLabel.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  icon: customPropTypes.itemShorthand,
  image: customPropTypes.itemShorthand,
}
export default FeedLabel
````

## File: views/Feed/FeedLike.d.ts/FeedLike.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { IconProps } from '../../elements/Icon'
export interface FeedLikeProps extends StrictFeedLikeProps {
  [key: string]: any
}
export interface StrictFeedLikeProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  icon?: SemanticShorthandItem<IconProps>
}
declare const FeedLike: ForwardRefComponent<FeedLikeProps, HTMLDivElement>
export default FeedLike
````

## File: views/Feed/FeedLike.js/FeedLike.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
import Icon from '../../elements/Icon'
const FeedLike = React.forwardRef(function (props, ref) {
  const { children, className, content, icon } = props
  const classes = cx('like', className)
  const rest = getUnhandledProps(FeedLike, props)
  const ElementType = getComponentType(props, { defaultAs: 'a' })
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {content}
    </ElementType>
  )
})
FeedLike.displayName = 'FeedLike'
FeedLike.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  icon: customPropTypes.itemShorthand,
}
export default FeedLike
````

## File: views/Feed/FeedMeta.d.ts/FeedMeta.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { FeedLikeProps } from './FeedLike'
export interface FeedMetaProps extends StrictFeedMetaProps {
  [key: string]: any
}
export interface StrictFeedMetaProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  like?: SemanticShorthandItem<FeedLikeProps>
}
declare const FeedMeta: ForwardRefComponent<FeedMetaProps, HTMLDivElement>
export default FeedMeta
````

## File: views/Feed/FeedMeta.js/FeedMeta.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import FeedLike from './FeedLike'
const FeedMeta = React.forwardRef(function (props, ref) {
  const { children, className, content, like } = props
  const classes = cx('meta', className)
  const rest = getUnhandledProps(FeedMeta, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {createShorthand(FeedLike, (val) => ({ content: val }), like, { autoGenerateKey: false })}
      {content}
    </ElementType>
  )
})
FeedMeta.displayName = 'FeedMeta'
FeedMeta.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  like: customPropTypes.itemShorthand,
}
export default FeedMeta
````

## File: views/Feed/FeedSummary.d.ts/FeedSummary.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import { FeedDateProps } from './FeedDate'
import { FeedUserProps } from './FeedUser'
export interface FeedSummaryProps extends StrictFeedSummaryProps {
  [key: string]: any
}
export interface StrictFeedSummaryProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  date?: SemanticShorthandItem<FeedDateProps>
  user?: SemanticShorthandItem<FeedUserProps>
}
declare const FeedSummary: ForwardRefComponent<FeedSummaryProps, HTMLDivElement>
export default FeedSummary
````

## File: views/Feed/FeedSummary.js/FeedSummary.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthand,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
import FeedDate from './FeedDate'
import FeedUser from './FeedUser'
const FeedSummary = React.forwardRef(function (props, ref) {
  const { children, className, content, date, user } = props
  const classes = cx('summary', className)
  const rest = getUnhandledProps(FeedSummary, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {createShorthand(FeedUser, (val) => ({ content: val }), user, { autoGenerateKey: false })}
      {
}
      {content && ' '}
      {content}
      {content && ' '}
      {createShorthand(FeedDate, (val) => ({ content: val }), date, { autoGenerateKey: false })}
    </ElementType>
  )
})
FeedSummary.displayName = 'FeedSummary'
FeedSummary.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  date: customPropTypes.itemShorthand,
  user: customPropTypes.itemShorthand,
}
export default FeedSummary
````

## File: views/Feed/FeedUser.d.ts/FeedUser.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface FeedUserProps extends StrictFeedUserProps {
  [key: string]: any
}
export interface StrictFeedUserProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const FeedUser: ForwardRefComponent<FeedUserProps, HTMLAnchorElement>
export default FeedUser
````

## File: views/Feed/FeedUser.js/FeedUser.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
const FeedUser = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('user', className)
  const rest = getUnhandledProps(FeedUser, props)
  const ElementType = getComponentType(props, { defaultAs: 'a' })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
FeedUser.displayName = 'FeedUser'
FeedUser.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
export default FeedUser
````

## File: views/Feed/index.d.ts/index.d.ts
````typescript
export { default, FeedProps, StrictFeedProps } from './Feed'
````

## File: views/Feed/index.js/index.js
````javascript
export default from './Feed'
````

## File: views/Item/index.d.ts/index.d.ts
````typescript
export { default, ItemProps, StrictItemProps } from './Item'
````

## File: views/Item/index.js/index.js
````javascript
export default from './Item'
````

## File: views/Item/Item.d.ts/Item.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent, SemanticShorthandItem } from '../../generic'
import ItemContent from './ItemContent'
import ItemDescription, { ItemDescriptionProps } from './ItemDescription'
import ItemExtra, { ItemExtraProps } from './ItemExtra'
import ItemGroup from './ItemGroup'
import ItemHeader, { ItemHeaderProps } from './ItemHeader'
import ItemImage, { ItemImageProps } from './ItemImage'
import ItemMeta, { ItemMetaProps } from './ItemMeta'
export interface ItemProps extends StrictItemProps {
  [key: string]: any
}
export interface StrictItemProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<ItemDescriptionProps>
  extra?: SemanticShorthandItem<ItemExtraProps>
  header?: SemanticShorthandItem<ItemHeaderProps>
  image?: SemanticShorthandItem<ItemImageProps>
  meta?: SemanticShorthandItem<ItemMetaProps>
}
declare const Item: ForwardRefComponent<ItemProps, HTMLDivElement> & {
  Content: typeof ItemContent
  Description: typeof ItemDescription
  Extra: typeof ItemExtra
  Group: typeof ItemGroup
  Header: typeof ItemHeader
  Image: typeof ItemImage
  Meta: typeof ItemMeta
}
export default Item
````

## File: views/Item/Item.js/Item.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib'
import ItemContent from './ItemContent'
import ItemDescription from './ItemDescription'
import ItemExtra from './ItemExtra'
import ItemGroup from './ItemGroup'
import ItemHeader from './ItemHeader'
import ItemImage from './ItemImage'
import ItemMeta from './ItemMeta'
const Item = React.forwardRef(function (props, ref) {
  const { children, className, content, description, extra, header, image, meta } = props
  const classes = cx('item', className)
  const rest = getUnhandledProps(Item, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {ItemImage.create(image, { autoGenerateKey: false })}
      <ItemContent
        content={content}
        description={description}
        extra={extra}
        header={header}
        meta={meta}
      />
    </ElementType>
  )
})
Item.Content = ItemContent
Item.Description = ItemDescription
Item.Extra = ItemExtra
Item.Group = ItemGroup
Item.Header = ItemHeader
Item.Image = ItemImage
Item.Meta = ItemMeta
Item.displayName = 'Item'
Item.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  extra: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  image: customPropTypes.itemShorthand,
  meta: customPropTypes.itemShorthand,
}
export default Item
````

## File: views/Item/ItemContent.d.ts/ItemContent.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandContent,
  SemanticShorthandItem,
  SemanticVERTICALALIGNMENTS,
} from '../../generic'
import { ItemDescriptionProps } from './ItemDescription'
import { ItemExtraProps } from './ItemExtra'
import { ItemHeaderProps } from './ItemHeader'
import { ItemMetaProps } from './ItemMeta'
export interface ItemContentProps extends StrictItemContentProps {
  [key: string]: any
}
export interface StrictItemContentProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  description?: SemanticShorthandItem<ItemDescriptionProps>
  extra?: SemanticShorthandItem<ItemExtraProps>
  header?: SemanticShorthandItem<ItemHeaderProps>
  meta?: SemanticShorthandItem<ItemMetaProps>
  verticalAlign?: SemanticVERTICALALIGNMENTS
}
declare const ItemContent: ForwardRefComponent<ItemContentProps, HTMLDivElement>
export default ItemContent
````

## File: views/Item/ItemContent.js/ItemContent.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getVerticalAlignProp,
} from '../../lib'
import ItemHeader from './ItemHeader'
import ItemDescription from './ItemDescription'
import ItemExtra from './ItemExtra'
import ItemMeta from './ItemMeta'
const ItemContent = React.forwardRef(function (props, ref) {
  const { children, className, content, description, extra, header, meta, verticalAlign } = props
  const classes = cx(getVerticalAlignProp(verticalAlign), 'content', className)
  const rest = getUnhandledProps(ItemContent, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {ItemHeader.create(header, { autoGenerateKey: false })}
      {ItemMeta.create(meta, { autoGenerateKey: false })}
      {ItemDescription.create(description, { autoGenerateKey: false })}
      {ItemExtra.create(extra, { autoGenerateKey: false })}
      {content}
    </ElementType>
  )
})
ItemContent.displayName = 'ItemContent'
ItemContent.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  description: customPropTypes.itemShorthand,
  extra: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  meta: customPropTypes.itemShorthand,
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),
}
export default ItemContent
````

## File: views/Item/ItemDescription.d.ts/ItemDescription.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ItemDescriptionProps extends StrictItemDescriptionProps {
  [key: string]: any
}
export interface StrictItemDescriptionProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ItemDescription: ForwardRefComponent<ItemDescriptionProps, HTMLDivElement>
export default ItemDescription
````

## File: views/Item/ItemDescription.js/ItemDescription.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ItemDescription = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('description', className)
  const rest = getUnhandledProps(ItemDescription, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ItemDescription.displayName = 'ItemDescription'
ItemDescription.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ItemDescription.create = createShorthandFactory(ItemDescription, (content) => ({ content }))
export default ItemDescription
````

## File: views/Item/ItemExtra.d.ts/ItemExtra.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ItemExtraProps extends StrictItemExtraProps {
  [key: string]: any
}
export interface StrictItemExtraProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ItemExtra: ForwardRefComponent<ItemExtraProps, HTMLDivElement>
export default ItemExtra
````

## File: views/Item/ItemExtra.js/ItemExtra.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ItemExtra = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('extra', className)
  const rest = getUnhandledProps(ItemExtra, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ItemExtra.displayName = 'ItemExtra'
ItemExtra.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ItemExtra.create = createShorthandFactory(ItemExtra, (content) => ({ content }))
export default ItemExtra
````

## File: views/Item/ItemGroup.d.ts/ItemGroup.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticShorthandCollection,
  SemanticShorthandContent,
} from '../../generic'
import { ItemProps } from './Item'
export interface ItemGroupProps extends StrictItemGroupProps {
  [key: string]: any
}
export interface StrictItemGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  divided?: boolean
  items?: SemanticShorthandCollection<ItemProps>
  link?: boolean
  relaxed?: boolean | 'very'
  unstackable?: boolean
}
declare const ItemGroup: ForwardRefComponent<ItemGroupProps, HTMLDivElement>
export default ItemGroup
````

## File: views/Item/ItemGroup.js/ItemGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
  getKeyOrValueAndKey,
} from '../../lib'
import Item from './Item'
const ItemGroup = React.forwardRef(function (props, ref) {
  const { children, className, content, divided, items, link, relaxed, unstackable } = props
  const classes = cx(
    'ui',
    getKeyOnly(divided, 'divided'),
    getKeyOnly(link, 'link'),
    getKeyOnly(unstackable, 'unstackable'),
    getKeyOrValueAndKey(relaxed, 'relaxed'),
    'items',
    className,
  )
  const rest = getUnhandledProps(ItemGroup, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  const itemsJSX = _.map(items, (item) => {
    const { childKey, ...itemProps } = item
    const finalKey =
      childKey ??
      [itemProps.content, itemProps.description, itemProps.header, itemProps.meta].join('-')
    return <Item {...itemProps} key={finalKey} />
  })
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {itemsJSX}
    </ElementType>
  )
})
ItemGroup.displayName = 'ItemGroup'
ItemGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  divided: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  link: PropTypes.bool,
  relaxed: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['very'])]),
  unstackable: PropTypes.bool,
}
export default ItemGroup
````

## File: views/Item/ItemHeader.d.ts/ItemHeader.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ItemHeaderProps extends StrictItemHeaderProps {
  [key: string]: any
}
export interface StrictItemHeaderProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ItemHeader: ForwardRefComponent<ItemHeaderProps, HTMLDivElement>
export default ItemHeader
````

## File: views/Item/ItemHeader.js/ItemHeader.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ItemHeader = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('header', className)
  const rest = getUnhandledProps(ItemHeader, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ItemHeader.displayName = 'ItemHeader'
ItemHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ItemHeader.create = createShorthandFactory(ItemHeader, (content) => ({ content }))
export default ItemHeader
````

## File: views/Item/ItemImage.d.ts/ItemImage.d.ts
````typescript
import { ImageProps, StrictImageProps } from '../../elements/Image'
import { ForwardRefComponent, SemanticSIZES } from '../../generic'
export interface ItemImageProps extends ImageProps {
  [key: string]: any
  size?: SemanticSIZES
}
export interface StrictItemImageProps extends StrictImageProps {
  size?: SemanticSIZES
}
declare const ItemImage: ForwardRefComponent<ItemImageProps, HTMLImageElement>
export default ItemImage
````

## File: views/Item/ItemImage.js/ItemImage.js
````javascript
import * as React from 'react'
import { createShorthandFactory, getUnhandledProps } from '../../lib'
import Image from '../../elements/Image'
const ItemImage = React.forwardRef(function (props, ref) {
  const { size } = props
  const rest = getUnhandledProps(ItemImage, props)
  return <Image {...rest} size={size} ui={!!size} wrapped ref={ref} />
})
ItemImage.displayName = 'ItemImage'
ItemImage.propTypes = {
  size: Image.propTypes.size,
}
ItemImage.create = createShorthandFactory(ItemImage, (src) => ({ src }))
export default ItemImage
````

## File: views/Item/ItemMeta.d.ts/ItemMeta.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface ItemMetaProps extends StrictItemMetaProps {
  [key: string]: any
}
export interface StrictItemMetaProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const ItemMeta: ForwardRefComponent<ItemMetaProps, HTMLDivElement>
export default ItemMeta
````

## File: views/Item/ItemMeta.js/ItemMeta.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const ItemMeta = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('meta', className)
  const rest = getUnhandledProps(ItemMeta, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
ItemMeta.displayName = 'ItemMeta'
ItemMeta.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
ItemMeta.create = createShorthandFactory(ItemMeta, (content) => ({ content }))
export default ItemMeta
````

## File: views/Statistic/index.d.ts/index.d.ts
````typescript
export { default, StatisticProps, StrictStatisticProps } from './Statistic'
````

## File: views/Statistic/index.js/index.js
````javascript
export default from './Statistic'
````

## File: views/Statistic/Statistic.d.ts/Statistic.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticFLOATS,
  SemanticShorthandContent,
} from '../../generic'
import StatisticGroup from './StatisticGroup'
import StatisticLabel from './StatisticLabel'
import StatisticValue from './StatisticValue'
export type StatisticSizeProp = 'mini' | 'tiny' | 'small' | 'large' | 'huge'
export interface StatisticProps extends StrictStatisticProps {
  [key: string]: any
}
export interface StrictStatisticProps {
  as?: any
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  floated?: SemanticFLOATS
  horizontal?: boolean
  inverted?: boolean
  label?: SemanticShorthandContent
  size?: StatisticSizeProp
  text?: boolean
  value?: SemanticShorthandContent
}
declare const Statistic: ForwardRefComponent<StatisticProps, HTMLDivElement> & {
  Group: typeof StatisticGroup
  Label: typeof StatisticLabel
  Value: typeof StatisticValue
}
export default Statistic
````

## File: views/Statistic/Statistic.js/Statistic.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getValueAndKey,
} from '../../lib'
import StatisticGroup from './StatisticGroup'
import StatisticLabel from './StatisticLabel'
import StatisticValue from './StatisticValue'
const Statistic = React.forwardRef(function (props, ref) {
  const {
    children,
    className,
    color,
    content,
    floated,
    horizontal,
    inverted,
    label,
    size,
    text,
    value,
  } = props
  const classes = cx(
    'ui',
    color,
    size,
    getValueAndKey(floated, 'floated'),
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(inverted, 'inverted'),
    'statistic',
    className,
  )
  const rest = getUnhandledProps(Statistic, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {StatisticValue.create(value, {
        defaultProps: { text },
        autoGenerateKey: false,
      })}
      {StatisticLabel.create(label, { autoGenerateKey: false })}
    </ElementType>
  )
})
Statistic.displayName = 'Statistic'
Statistic.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  floated: PropTypes.oneOf(SUI.FLOATS),
  horizontal: PropTypes.bool,
  inverted: PropTypes.bool,
  label: customPropTypes.contentShorthand,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'big', 'massive', 'medium')),
  text: PropTypes.bool,
  value: customPropTypes.contentShorthand,
}
Statistic.Group = StatisticGroup
Statistic.Label = StatisticLabel
Statistic.Value = StatisticValue
Statistic.create = createShorthandFactory(Statistic, (content) => ({ content }))
export default Statistic
````

## File: views/Statistic/StatisticGroup.d.ts/StatisticGroup.d.ts
````typescript
import * as React from 'react'
import {
  ForwardRefComponent,
  SemanticCOLORS,
  SemanticShorthandCollection,
  SemanticShorthandContent,
  SemanticWIDTHS,
} from '../../generic'
import { StatisticProps, StatisticSizeProp } from './Statistic'
export interface StatisticGroupProps extends StrictStatisticGroupProps {
  [key: string]: any
}
export interface StrictStatisticGroupProps {
  as?: any
  children?: React.ReactNode
  className?: string
  color?: SemanticCOLORS
  content?: SemanticShorthandContent
  horizontal?: boolean
  inverted?: boolean
  items?: SemanticShorthandCollection<StatisticProps>
  size?: StatisticSizeProp
  widths?: SemanticWIDTHS
}
declare const StatisticGroup: ForwardRefComponent<StatisticGroupProps, HTMLDivElement>
export default StatisticGroup
````

## File: views/Statistic/StatisticGroup.js/StatisticGroup.js
````javascript
import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getWidthProp,
} from '../../lib'
import Statistic from './Statistic'
const StatisticGroup = React.forwardRef(function (props, ref) {
  const { children, className, color, content, horizontal, inverted, items, size, widths } = props
  const classes = cx(
    'ui',
    color,
    size,
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(inverted, 'inverted'),
    getWidthProp(widths),
    'statistics',
    className,
  )
  const rest = getUnhandledProps(StatisticGroup, props)
  const ElementType = getComponentType(props)
  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {_.map(items, (item) => Statistic.create(item))}
    </ElementType>
  )
})
StatisticGroup.displayName = 'StatisticGroup'
StatisticGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(SUI.COLORS),
  content: customPropTypes.contentShorthand,
  horizontal: PropTypes.bool,
  inverted: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  size: PropTypes.oneOf(_.without(SUI.SIZES, 'big', 'massive', 'medium')),
  widths: PropTypes.oneOf(SUI.WIDTHS),
}
export default StatisticGroup
````

## File: views/Statistic/StatisticLabel.d.ts/StatisticLabel.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface StatisticLabelProps extends StrictStatisticLabelProps {
  [key: string]: any
}
export interface StrictStatisticLabelProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
}
declare const StatisticLabel: ForwardRefComponent<StatisticLabelProps, HTMLDivElement>
export default StatisticLabel
````

## File: views/Statistic/StatisticLabel.js/StatisticLabel.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
} from '../../lib'
const StatisticLabel = React.forwardRef(function (props, ref) {
  const { children, className, content } = props
  const classes = cx('label', className)
  const rest = getUnhandledProps(StatisticLabel, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
StatisticLabel.displayName = 'StatisticLabel'
StatisticLabel.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
}
StatisticLabel.create = createShorthandFactory(StatisticLabel, (content) => ({ content }))
export default StatisticLabel
````

## File: views/Statistic/StatisticValue.d.ts/StatisticValue.d.ts
````typescript
import * as React from 'react'
import { ForwardRefComponent, SemanticShorthandContent } from '../../generic'
export interface StatisticValueProps extends StrictStatisticValueProps {
  [key: string]: any
}
export interface StrictStatisticValueProps {
  as?: any
  children?: React.ReactNode
  className?: string
  content?: SemanticShorthandContent
  text?: boolean
}
declare const StatisticValue: ForwardRefComponent<StatisticValueProps, HTMLDivElement>
export default StatisticValue
````

## File: views/Statistic/StatisticValue.js/StatisticValue.js
````javascript
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'
import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
const StatisticValue = React.forwardRef(function (props, ref) {
  const { children, className, content, text } = props
  const classes = cx(getKeyOnly(text, 'text'), 'value', className)
  const rest = getUnhandledProps(StatisticValue, props)
  const ElementType = getComponentType(props)
  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})
StatisticValue.displayName = 'StatisticValue'
StatisticValue.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: customPropTypes.contentShorthand,
  text: PropTypes.bool,
}
StatisticValue.create = createShorthandFactory(StatisticValue, (content) => ({ content }))
export default StatisticValue
````
