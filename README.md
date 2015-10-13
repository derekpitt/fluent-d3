# fluent-d3

A wrapper around d3 to give a more fluent like API for building opinionated charts.

    var line = new lineGraphBuilder.LineGraphBuilder()
      .withSize(500, 230)
      .withMargins(50, 50, 20, 50)
      .configureAxis(function(a) {
        a.withXLabels(['1/15', '2/15', '3/15', '4/15']);
        a.withYRange(0, 100);
      })
      .withLine(function(l) {
        l.withClass("line1")
          .withFill()
          .withData([
            { x: '1/15', y: 45 },
            { x: '2/15', y: 10 },
            { x: '3/15', y: 70 },
            { x: '4/15', y: 50 }
          ]);
      });

    line.draw(document.getElementById("line-graph"));

## Install
#### JSPM

    jspm install fluent-d3=github:derekpitt/fluent-d3

## Give me a picture!

![Example Line Graph](https://raw.githubusercontent.com/derekpitt/fluent-d3/master/examples/example.png)

View a [Live Example](https://rawgit.com/derekpitt/fluent-d3/master/examples/index.html)


This package will contain a few charting elements we are using in [SlideRoom](http://www.slideroom.com)'s Review portal as well as a new product we are currently building.

## Documentation

Coming soon

## TODO

- Documentation
- Bring over:
    - donut element
    - star element
    - bar chart element
- Better update methods
