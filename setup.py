from setuptools import setup, find_packages

setup(
    name="AISandbox",
    package_dir={"": "packages/python"},
    packages=find_packages(where="packages/python"),
    version="0.0.1",
    license="MIT",
    description="Prototyping AI architectures in a node based editor.",
    long_description=open("README.md", "r", encoding="utf-8").read(),
    long_description_content_type="text/markdown",
    author="Shubhamai",
    author_email="shubham.aiengineer@gmail.com",
    url="https://github.com/shubhamai/aisandbox",
    keywords=[
        "artificial intelligence",
    ],
    install_requires=[],
    setup_requires=[
        "pytest-runner",
    ],
    tests_require=[],
    classifiers=[
        "Development Status :: 1 - Planning",
        "Intended Audience :: Developers",
        "Intended Audience :: Education",
        "Intended Audience :: Science/Research",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
)
