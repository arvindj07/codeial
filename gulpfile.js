//gulp compresses the files and if we wanna rename a file a file by adding a hash to it ,it does that also
const gulp = require('gulp');

const sass=require('gulp-sass');    //converts sass to css
const cssnano=require('gulp-cssnano');  // compresses the css files to one line
const rev=require('gulp-rev');      // used to rename the file with a hash alongside them i.e, home.css to home-b3kj24.css
const uglify=require('gulp-uglify-es').default;
const imagemin=require('gulp-imagemin');
const del = require('del');

// this is the task that is run to minify the css

gulp.task('css',function(done){
  console.log('minifyinig css...');
  gulp.src('./assets/sass/**/*.scss')   // ** means any folder nd sub-folder inside it, *.scss means any file_name.scss 
  .pipe(sass())                         //convert sass to css
  .pipe(cssnano())
  .pipe(gulp.dest('./assets.css'));     //pipe is funnc that calls all the sub-middleware in Gulp
                                        //Miniificaion is done,

  gulp.src('./assets/**/*.css')  // here we r changing the naming of the files using rev
  .pipe(rev())                          // renaming using rev() by adding hash
  .pipe(gulp.dest('./public/assets'))    //putting renamed files in public/assets in css folder
  .pipe(rev.manifest({                  // store the manifest, manifest stores a map of files like x.css -> x-v43k.css
    cwd: 'public',
    merge:true, 
  }))
  .pipe(gulp.dest('./public/assets'));  // we have to put all the above things in gulp.dest() again
  done();                               // instead of returning we can use done() func.
});

// gulp.task('js',function(done){
//   console.log('minifying js......');
//   return gulp.src('./assets/**/*.js')
//   .pipe(uglify())
//   .pipe(rev())
//   .pipe(gulp.dest('./public/assets'))
//   .pipe(rev.manifest({
//     cwd:'public',
//     merge:true,
//   }))
//   .pipe(gulp.dest('./public/assets'));
  
// });

gulp.task('js',function(done){
  console.log('minifyinig js...');
  gulp.src('./assets/**/*.js')  
  .pipe(uglify())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))    
  .pipe(rev.manifest({                  
    cwd: 'public',
    merge:true, 
  }))
  .pipe(gulp.dest('./public/assets'));  
  done();                               
});

gulp.task('images',function(done){
  console.log('commpressing images......');
  gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)') // regex- ie, regular express used to take images of all these formats
  .pipe(imagemin())
  .pipe(rev())
  .pipe(gulp.dest('./public/assets'))
  .pipe(rev.manifest({
    cwd:'public',
    merge:true,
  }))
  .pipe(gulp.dest('./public/assets'));
  done();
});

// empty the public/assets directory, used whenever buling a proj, to remove the previous build nd build from scratch 
gulp.task('clean:assets',function(done){
  del.sync('./public/assets');
  done();
});

gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){
  console.log('Building Assets');
  done();
});
