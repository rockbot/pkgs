assert = require("assert")
pkgs = require("..")

describe("pkgs", function(){

  this.timeout(5000)

  it("fetches an array of package metadata", function(done) {
    pkgs(["ghwd", "domready", "lodash.pluck"], function(err, res){
      assert(!err)
      assert(Array.isArray(res))
      assert.equal(res.length, 3)
      assert.equal(res[0].name, "ghwd")
      assert.equal(res[1].name, "domready")
      assert.equal(res[2].name, "lodash.pluck")
      done()
    })
  })

  it("gets all properties by default", function(done) {
    pkgs(["superagent"], function(err, res){
      assert(!err)
      var pkg = res[0]
      assert(pkg._id)
      assert(pkg._rev)
      assert(pkg.name)
      assert(pkg.description)
      assert(pkg["dist-tags"])
      assert(pkg.versions)
      assert(pkg.keywords)
      assert(pkg.repository)
      assert(pkg.homepage)
      assert(pkg.author)
      assert(pkg.bugs)
      assert(pkg.users)
      assert(pkg.readme)
      done()
    })
  })

  it("accepts an optional second argument specifying desired properties", function(done) {
    pkgs(["faves"], ["name", "description"], function(err, res){
      assert(!err)
      assert.equal(res.length, 1)
      assert.deepEqual(Object.keys(res[0]).sort(), ["name", "description"].sort())
      done()
    })
  })

  it("catches errors", function(done) {
    pkgs(["kjsdofiusdfdskjfjjk"], ["name"], function(err, res){
      assert(err)
      done()
    })
  })

})
