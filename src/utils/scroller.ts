// // CoreScroller contains the core function (scroll) and logic for relative scrolls.  All scrolls are ultimately
// // translated to relative scrolls.  CoreScroller is not exported.
// const CoreScroller = {
//   init() {
//     this.time = 0
//     this.lastEvent = this.keyIsDown = null
//     this.installCanceEventListener()
//   },
//
//   // This installs listeners for events which should cancel smooth scrolling.
//   installCanceEventListener() {
//     // NOTE(smblott) With extreme keyboard configurations, Chrome sometimes does not get a keyup event for
//     // every keydown, in which case tapping "j" scrolls indefinitely.  This appears to be a Chrome/OS/XOrg bug
//     // of some kind.  See #1549.
//     // TODO(philc): I believe some of these returns are unnecessary.
//     return handlerStack.push({
//       _name: 'scroller/track-key-status',
//       keydown: (event) =>
//         handlerStack.alwaysContinueBubbling(() => {
//           this.keyIsDown = true
//           if (!event.repeat) {
//             this.time += 1
//           }
//           this.lastEvent = event
//         }),
//       keyup: (event) =>
//         handlerStack.alwaysContinueBubbling(() => {
//           this.keyIsDown = false
//           this.time += 1
//         }),
//       blur: (event) =>
//         handlerStack.alwaysContinueBubbling(() => {
//           if (event.target === window) {
//             this.time += 1
//           }
//         }),
//     })
//   },
//
//   // Return true if CoreScroller would not initiate a new scroll right now.
//   wouldNotInitiateScroll() {
//     return this.lastEvent && this.lastEvent.repeat && Settings.get('smoothScroll')
//   },
//
//   // Calibration fudge factors for continuous scrolling.  The calibration value starts at 1.0.  We then
//   // increase it (until it exceeds @maxCalibration) if we guess that the scroll is too slow, or decrease it
//   // (until it is less than @minCalibration) if we guess that the scroll is too fast.  The cutoff point for
//   // which guess we make is @calibrationBoundary. We require: 0 < @minCalibration <= 1 <= @maxCalibration.
//   minCalibration: 0.5, // Controls how much we're willing to slow scrolls down; smaller means more slow down.
//   maxCalibration: 1.6, // Controls how much we're willing to speed scrolls up; bigger means more speed up.
//   calibrationBoundary: 150, // Boundary between scrolls which are considered too slow, or too fast.
//
//   // Scroll element by a relative amount (a number) in some direction.
//   scroll(element: HTMLDivElement, direction: 'x' | 'y', amount: number, continuous = true) {
//     // We don't activate new animators on keyboard repeats; rather, the most-recently activated animator
//     // continues scrolling.
//     if (this.lastEvent != null ? this.lastEvent.repeat : undefined) return
//
//     const activationTime = ++this.time
//     const myKeyIsStillDown = () => this.time === activationTime && this.keyIsDown
//
//     // Store amount's sign and make amount positive; the arithmetic is clearer when amount is positive.
//     const sign = getSign(amount)
//     amount = Math.abs(amount)
//
//     // Initial intended scroll duration (in ms). We allow a bit longer for longer scrolls.
//     const duration = Math.max(100, 20 * Math.log(amount))
//
//     let totalDelta = 0
//     let totalElapsed = 0.0
//     let calibration = 1.0
//     let previousTimestamp = null
//     const cancelEventListener = this.installCanceEventListener()
//
//     var animate = (timestamp) => {
//       if (previousTimestamp == null) previousTimestamp = timestamp
//       if (timestamp === previousTimestamp) return requestAnimationFrame(animate)
//
//       // The elapsed time is typically about 16ms.
//       const elapsed = timestamp - previousTimestamp
//       totalElapsed += elapsed
//       previousTimestamp = timestamp
//
//       // The constants in the duration calculation, above, are chosen to provide reasonable scroll speeds for
//       // distinct keypresses.  For continuous scrolls, some scrolls are too slow, and others too fast. Here, we
//       // speed up the slower scrolls, and slow down the faster scrolls.
//       if (
//         myKeyIsStillDown() &&
//         totalElapsed >= 75 &&
//         this.minCalibration <= calibration &&
//         calibration <= this.maxCalibration
//       ) {
//         // Speed up slow scrolls.
//         if (1.05 * calibration * amount < this.calibrationBoundary) calibration *= 1.05
//         // Slow down fast scrolls.
//         if (this.calibrationBoundary < 0.95 * calibration * amount) calibration *= 0.95
//       }
//
//       // Calculate the initial delta, rounding up to ensure progress.  Then, adjust delta to account for the
//       // current scroll state.
//       let delta = Math.ceil(amount * (elapsed / duration) * calibration)
//       delta = myKeyIsStillDown() ? delta : Math.max(0, Math.min(delta, amount - totalDelta))
//
//       if (delta && performScroll(element, direction, sign * delta)) {
//         totalDelta += delta
//         return requestAnimationFrame(animate)
//       }
//       // We're done.
//       handlerStack.remove(cancelEventListener)
//       return checkVisibility(element)
//     }
//
//     // Start scrolling.
//     requestAnimationFrame(animate)
//   },
// }
//
// export const Scroller = {
//   // scroll the active element in :direction by :amount * :factor.
//   // :factor is needed because :amount can take on string values, which scrollBy converts to element dimensions.
//   // eslint-disable-next-line consistent-return
//   scrollBy(direction: 'x' | 'y', amount: number, factor = 1, continuous = true) {
//     // Avoid the expensive scroll calculation if it will not be used.  This reduces costs during smooth,
//     // continuous scrolls, and is just an optimization.
//     if (!CoreScroller.wouldNotInitiateScroll()) {
//       const element = document.getElementsByClassName('editor-page')[0]
//       const elementAmount = factor * amount
//       return CoreScroller.scroll(element, direction, elementAmount, continuous)
//     }
//   },
// }

export const Scroller = 1
