# Changelog
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.0.0 - 2017-11-11
- No changes, cutting version 1.0.0 of the API.

## 0.0.4 - 2017-09-24
### Changed
- Reorganized normalizeKeys section of README to make the motivation for and usage of this feature more clear.

## 0.0.3 - 2017-06-27
### Fixed
- Fixed issue where an error would be thrown in environments that do not support the symbol type. The map will now gracefully degrade and offer no special functionality for symbols in these environments.

## 0.0.2 - 2017-06-20
### Fixed
- Fixed issue where symbol wrapper objects weren't normalized to their underlying symbol by the default key normalizing function.
