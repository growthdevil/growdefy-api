#!/bin/bash
#remove previous archived version
rm -rf /home/bitnami/archive 2>/dev/null
#move previous version to archive
mv /home/bitnami/project /home/bitnami/archive 2>/dev/null

mkdir /home/bitnami/project 2>/dev/null