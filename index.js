/**
1. Aloha 4
RPT – Command Processor

This exercise simulates a command line shell. It does NOT actually create any objects on the physical disk. Instead, it maintains objects and state within the context of the running application.
While this application could be written procedurally, using OOP techniques (when appropriate) is preferred to separate functionality into more logical and maintainable pieces.

Input

The main input mechanism of the application is the acceptance of text on the command line. Commands should be read and processed until the [quit] command is found.
If the entered command is not recognized, the Unrecognized command message should be returned. Or if the command has invalid parameters, or any parameter is missing, the Invalid Command message should be returned.

Commands

Quit
Command Name: quit
This command terminates the main application loop.

Current Directory
Command Name: pwd
This command prints the full path of the current directory.

List Contents
Command Name: ls

Switches (** extra **):
[-r] – Recursive. If provided, prints everything in the current directory and all subdirectories.
This command lists the contents (directories and files) of the current directory. It writes a single item per line. If there are no items, print nothing.
If printing recursively, before printing contents, print the full path of the current directory.

Make Directory
Command Name: mkdir
Parameters:
[dirName] – the name of the directory to create. Character limit of 100.
This command creates a directory entry in the cache. If the directory already exists (by name), a message like “Directory already exists” should be printed.

Change Directory
Command Name: cd
Parameters:
[dirName] – the name of the sub-directory to change current path to.
This command changes the current path to a sub-directory (by name). If the name does not exist, a message like “Directory not found” should be displayed.
The command should also accept the dirName of “..”, which indicates the current directory should be changed to the parent. If the current directory is “root”, no message should be displayed.

Create File
Command Name: touch
Parameters:
    [fileName] – the name of the file to create. Character limit of 100.
    This command creates a “file” in the current directory.

Extras
    If time permits, the following additional features could be added:
    An optional parameter can be added to the command to accept a multi-faceted path (i.e., subdir1)
*/
const CommandLine = require('./command');

const command = new CommandLine();

process.stdin.resume();
process.stdin.setEncoding("ascii");
let input = "";
process.stdin.on("data", function (chunk) {
    input = chunk.replace(/\r?\n|\r/g, '');
    command.onCommand(input);
});

process.stdin.on("end", function () {
    // now we can read/parse input
});