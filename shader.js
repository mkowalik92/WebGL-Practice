class Shader {

  constructor(glContext, vsSourcePath, fsSourcePath) {
    return (async () => {
      var vertexShader = this.createShader(glContext, glContext.VERTEX_SHADER, await this.fetchSourceFileContents(vsSourcePath));
      var fragmentShader = this.createShader(glContext, glContext.FRAGMENT_SHADER, await this.fetchSourceFileContents(fsSourcePath));
      this.programID = this.createProgram(glContext, vertexShader, fragmentShader);
      console.log(this.programID);
      return this;
    })();
  }

  async fetchSourceFileContents(filename) {
    let response = await fetch(filename);
    let text = await response.text();
    return text;
  }

  createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    else {
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }
  }

  createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      return program;
    }
    else {
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }
  }

}