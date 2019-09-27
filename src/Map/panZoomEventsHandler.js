import Hammer from 'hammerjs'

export default {
  haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
  init: function Whatever (options) {
    const instance = options.instance
    let initialScale = 1
    let pannedX = 0
    let pannedY = 0
    // Init Hammer
    // Listen only for pointer and touch events
    this.hammer = Hammer(options.svgElement, {
      inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
    })
    // Enable pinch
    this.hammer.get('pinch').set({ enable: true })
    // Handle double tap
    this.hammer.on('doubletap', event => {
      instance.zoomIn()
    })
    // Handle pan
    this.hammer.on('panstart panmove', event => {
      // On pan start reset panned variables
      if (event.type === 'panstart') {
        pannedX = 0
        pannedY = 0
      }
      // Pan only the difference
      instance.panBy({ x: event.deltaX - pannedX, y: event.deltaY - pannedY })
      pannedX = event.deltaX
      pannedY = event.deltaY
    })
    // Handle pinch
    this.hammer.on('pinchstart pinchmove', event => {
      // On pinch start remember initial zoom
      if (event.type === 'pinchstart') {
        initialScale = instance.getZoom()
        instance.zoomAtPoint(initialScale * event.scale, { x: event.center.x, y: event.center.y })
      }
      instance.zoomAtPoint(initialScale * event.scale, { x: event.center.x, y: event.center.y })
    })
    // Prevent moving the page on some devices when panning over SVG
    options.svgElement.addEventListener('touchmove', (e) => { e.preventDefault() })
  },
  destroy: () => {
    this.hammer.destroy()
  }
}
