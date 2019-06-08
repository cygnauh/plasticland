const { execSync } = require('child_process')
const fs = require('fs')
const ffmpeg = require('ffmpeg-static')

const INPUT_PATH = 'public/models/' // dossier assets glb
const OUTPUT_PATH = 'public/models_converted/' // vers lequel on convertie le glb

/**
 * Convert models
 */

const converModels = (path) => {
  for (const dirent of fs.readdirSync(path, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      converModels(`${path}${dirent.name}/`)
      continue
    }
    const relativePath = path.replace(INPUT_PATH, '')
    if (dirent.name.endsWith('.glb')) {
      const fileName = dirent.name.replace('.glb', '')
      console.log(`Converting ${INPUT_PATH}${relativePath}${fileName}.glb`)
      console.log(`gltf-pipeline -i ${INPUT_PATH}${fileName}.glb -o ${OUTPUT_PATH}${fileName}.glb -t -d`)
      // execSync(`FBX2glTF-windows-x64.exe ${INPUT_PATH}${relativePath}${fileName}.fbx --output ${OUTPUT_PATH}${relativePath}${fileName} --binary`)
      execSync(`gltf-pipeline -i ${INPUT_PATH}${fileName}.glb -o ${OUTPUT_PATH}${fileName}.glb -t`) // retirer le d
    }
  }
};

converModels(INPUT_PATH)

/**
 * Convert Images
 */

const convertImages = (path) => { // écrase
  for (const dirent of fs.readdirSync(path, { withFileTypes: true })) {
    if (dirent.isDirectory()) {
      convertImages(`${path}${dirent.name}/`)
      continue
    }
    if (dirent.name.endsWith('.jpg') || dirent.name.endsWith('.png')) {
      console.log(`${path}${dirent.name}`)
      try {
        execSync(`${ffmpeg.path} -i ${path}${dirent.name} -vf scale=1024:-1 -y ${path}${dirent.name}`)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

convertImages(OUTPUT_PATH) // commenté pour voir la taille des images dans un premier temps
