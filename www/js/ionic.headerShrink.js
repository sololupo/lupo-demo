angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', function($document) {
    var fadeAmt;
    var subheaderFadeAmt;

    var shrink = function(tabs, tabs_amt, cachedHeader, subHeader, header, amt, dir) {
      ionic.requestAnimationFrame(function() { 
        // Threshold is equal to bar-height
        var threshold = 44;
        // Scrolling down
        if(dir === 1) {
          var _amt = Math.min(threshold, amt - threshold);
        } 
        // Scrolling up
        else if(dir === -1) {
          var _amt = Math.max(0, amt - threshold);
        }
        // The translation amounts should never be negative
        _amt = _amt < 0 ? 0 : _amt;
        amt = amt < 0 ? 0 : amt;
        tabs_amt = tabs_amt < 0 ? 0 : tabs_amt; 
        // Re-position the header
        header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + _amt + 'px, 0)';
        fadeAmt = 1 - _amt / threshold; 
        for(var i = 0, j = header.children.length; i < j; i++) {
          header.children[i].style.opacity = fadeAmt;
        }

        // Re-position the nav-bar-title
        if (cachedHeader) {
          cachedHeader.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + _amt + 'px, 0)';
        }

        // Re-position the sub-header
        subHeader.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + amt + 'px, 0)';

        // Re-position the tabs
        tabs.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + tabs_amt + 'px, 0)';
      });
    };

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var starty = 0;
        var shrinkAmt;
        var tabs_amt;
        // Threshold is equal to bar-height + create-post height;
        var threshold = 88;
        // header
        var header = $document[0].body.querySelector('[nav-bar="active"] .bar-header');
        // cached header
        var cachedHeader = $document[0].body.querySelector('[nav-bar="cached"] .bar-header');

        // sub-header
        var subHeader = $document[0].body.querySelector('.bar-subheader');
        // bar-subheader-3
        // var subHeader3 = $document[0].body.querySelector('.bar-subheader-3');


        var headerHeight = header.offsetHeight;
        var subHeaderHeight = subHeader.offsetHeight;
        var cachedHeaderHeight = cachedHeader.offsetHeight;

        // tabs
        var tabs = $document[0].body.querySelector('.tabs');
        var tabsHeight = tabs.offsetHeight;

        var prev = 0
        var delta = 0
        var dir = 1
        var prevDir = 1
        var prevShrinkAmt = 0;
        var prevTabsShrinkAmt = 0;
        
        $element.bind('scroll', function(e) {
          // if negative scrolling (eg: pull to refresh don't do anything)
          if(e.detail.scrollTop < 0)
            return false;
          // Scroll delta
          delta = e.detail.scrollTop - prev;
          // Claculate direction of scrolling
          dir = delta >= 0 ? 1 : -1;
          // Capture change of direction
          if(dir !== prevDir) 
            starty = e.detail.scrollTop;
          // If scrolling up
          if(dir === 1) {
            // Calculate shrinking amount
            shrinkAmt = headerHeight + subHeaderHeight - Math.max(0, (starty + headerHeight + subHeaderHeight) - e.detail.scrollTop);
            // Calculate shrinking for tabs
            tabs_amt = tabsHeight - Math.max(0, (starty + tabsHeight) - e.detail.scrollTop);
            // Start shrink
            shrink(tabs, tabs_amt, cachedHeader, subHeader, header, Math.min(threshold, shrinkAmt), dir);
            // Save prev shrink amount
            prevShrinkAmt = Math.min(threshold, shrinkAmt);
            prevTabsShrinkAmt = Math.min(tabsHeight, tabs_amt);
          }
          // If scrolling down
          else {
            // Calculate expansion amount
            shrinkAmt = prevShrinkAmt - Math.min(threshold, (starty - e.detail.scrollTop));
            // Calculate shrinking for tabs
            tabs_amt = prevTabsShrinkAmt - Math.min(tabsHeight, (starty - e.detail.scrollTop));
            // Start shrink
            shrink(tabs, tabs_amt, cachedHeader, subHeader, header, shrinkAmt, dir);
          }
          // Save prev states for comparison 
          prevDir = dir;
          prev = e.detail.scrollTop;
        });
      }
    }
  })

;